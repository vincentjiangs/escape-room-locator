import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { FIREBASE_COLLECTION } from "../common/Constants";
import { escapeRoomConverter } from "../models/EscapeRoom";
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "./common/Constants";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);

export const getEscapeRoom = (name, company, location) => {
  const roomRef = doc(firestore, FIREBASE_COLLECTION, name).withConverter(escapeRoomConverter);
  const room = await getDoc(roomRef);
  
}

export const addEscapeRoom = (room) => {
  const escapeRoomCollection = collection(firestore, FIREBASE_COLLECTION);
  const roomRef = doc(firestore, FIREBASE_COLLECTION, )
  return addDoc(escapeRoomCollection, {
    created: serverTimestamp(),
    name: name,
    company: company,
    location: location,
  });
};
