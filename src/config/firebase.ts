import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { env } from "./env";

export const initializeFirebaseAdmin = () => {
  if (getApps().length > 0) {
    return;
  }

  if (
    !env.FIREBASE_PROJECT_ID ||
    !env.FIREBASE_CLIENT_EMAIL ||
    !env.FIREBASE_PRIVATE_KEY
  ) {
    throw new Error("Firebase Admin credentials are missing");
  }

  initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
};

export { getAuth };