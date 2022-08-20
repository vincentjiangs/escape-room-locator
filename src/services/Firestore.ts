import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  DocumentSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
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
  const roomCollection = collection(firestore, FIREBASE_COLLECTION);
  const roomRef = doc(roomCollection, room.toString()).withConverter(escapeRoomConverter);
  const roomSnap = getDoc(roomRef);
  return roomSnap;
}

/**
 * Add a single escape room. Uses {@code EscapeRoom.toString()} as the database entry identifier.
 *
 * @param room
 * @returns
 */
export function addEscapeRoom(room: EscapeRoom): Promise<void> {
  const roomRef = doc(firestore, FIREBASE_COLLECTION, room.toString()).withConverter(escapeRoomConverter);
  return setDoc(roomRef, room);
}

/**
 * Batch update escape rooms. Updates existing documents and fails if the room does not exist.
 *
 * @param rooms
 * @returns
 */
export function addBatchEscapeRooms(rooms: EscapeRoom[]): Promise<void> {
  const batch = writeBatch(firestore);
  rooms.forEach((room) => {
    const roomRef = doc(firestore, FIREBASE_COLLECTION, room.toString()).withConverter(escapeRoomConverter);
    batch.update(roomRef, room);
  });
  return batch.commit();
}

// TODO: Safety check
export function removeEscapeRoom(room: EscapeRoom): Promise<void> {
  const roomRef = doc(firestore, FIREBASE_COLLECTION, room.toString()).withConverter(escapeRoomConverter);
  return deleteDoc(roomRef);
}
