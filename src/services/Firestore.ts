import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
} from "firebase/firestore";
import {
  FIREBASE_COLLECTION,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "../common/Constants";
import { EscapeRoom, escapeRoomConverter } from "../models/EscapeRoom";

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

export function getEscapeRoom(room: EscapeRoom): Promise<DocumentSnapshot> {
  const escapeRoomCollection = collection(firestore, FIREBASE_COLLECTION);
  const roomRef = doc(escapeRoomCollection, room.toString()).withConverter(
    escapeRoomConverter
  );
  const roomSnap = getDoc(roomRef);
  return roomSnap;
}

export function addEscapeRoom(room: EscapeRoom): Promise<DocumentReference> {
  const escapeRoomCollection = collection(firestore, FIREBASE_COLLECTION);
  const roomRef = doc(firestore, FIREBASE_COLLECTION);
  return addDoc(escapeRoomCollection, {
    created: serverTimestamp(),
    name: room.name,
    company: room.company,
    location: room.location,
  });
}
