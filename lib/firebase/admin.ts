import 'server-only';
import { cert } from 'firebase-admin/app';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import serviceAccount from './service-account.gitignore.json';

function getApp() {
  if (admin.apps.length === 0)
    return initializeApp({
      credential: cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      }),
    });
  return admin.app();
}

const app = getApp();

const adminFirestore = getFirestore(app);
const adminAuth = getAuth(app);

export { adminFirestore, adminAuth };
