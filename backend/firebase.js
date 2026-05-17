// backend/firebase.js
const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

// Option 1: Use service account JSON file (recommended for local dev)
// Place your downloaded serviceAccountKey.json in the backend/ folder

let serviceAccount;
try {
  serviceAccount = null;
} catch {
  console.warn(
    "serviceAccountKey.json not found. Falling back to env vars."
  );
}

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // Option 2: Use environment variables
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
}

const db = admin.firestore();

module.exports = { db, admin };
