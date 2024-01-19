import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';

export const credential = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
});

export const app =
  getApps().length < 1 ? initializeApp({ credential }) : getApp();
