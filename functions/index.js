/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// functions/index.js  (ESM)
import functions from "firebase-functions";
import admin from "firebase-admin";
import express from "express";
import fetch from "node-fetch";

admin.initializeApp();
const db = admin.firestore();

// Читай из runtime env (Firebase Functions → Variables)
const BOT_TOKEN = process.env.BOT_TOKEN;
const GROUP_ID  = process.env.GROUP_ID; // напр. -1001234567890
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const app = express();
app.use(express.json());

// Telegram → Firestore
app.post("/tg/webhook", async (req, res) => {
  try {
    const update = req.body;
    const msg = update?.message;
    if (msg?.chat?.id === Number(GROUP_ID)) {
      await db.collection("chatRooms").doc(String(GROUP_ID))
        .collection("messages").add({
          chatId: msg.chat.id,
          fromId: msg.from?.id ?? null,
          fromName: [msg.from?.first_name, msg.from?.last_name].filter(Boolean).join(" "),
          text: msg.text ?? "",
          ts: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
    res.status(200).send("ok");
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Web → Telegram (+ дублируем в Firestore)
app.post("/chat/send", async (req, res) => {
  try {
    const { text, name } = req.body;
    if (!text?.trim()) return res.status(400).json({ error: "empty" });

    await fetch(`${TG_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: GROUP_ID,
        text: `${name ? `(${name}) ` : ""}${text}`,
      }),
    });

    await db.collection("chatRooms").doc(String(GROUP_ID))
      .collection("messages").add({
        chatId: Number(GROUP_ID),
        fromId: null,
        fromName: name || "Web user",
        text,
        ts: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export const api = functions.region("us-central1").https.onRequest(app);
