import firebase from 'firebase';
import 'firebase/storage';

import { environment } from './environments/environment';

const firebaseConfig = {
  apiKey: `${environment.firebaseApiKey}`,
  authDomain: `${environment.firebaseAuthDomain}`,
  databaseURL: `${environment.firebaseDatabaseUrl}`,
  projectId: `${environment.firebaseProjectId}`,
  storageBucket: `${environment.firebaseStorageBucket}`,
  messagingSenderId: `${environment.firebaseMessageSenderId}`,
  appId: `${environment.firebaseAppId}`,
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const realTimeDb = app.database();
const db = app.firestore();
const auth = app.auth();
const storage = firebase.storage();

export { auth, db, storage, realTimeDb };
