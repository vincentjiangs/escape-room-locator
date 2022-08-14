import {
  DocumentData,
  SnapshotOptions,
  QueryDocumentSnapshot,
} from "firebase/firestore";

class EscapeRoom {
  name: string;
  company: string;
  location: string;

  constructor(name: string, company: string, location: string) {
    this.name = name;
    this.company = company;
    this.location = location;
  }
  toString() {
    return this.name + ", " + this.company + ", " + this.location;
  }
}

export const escapeRoomConverter = {
  toFirestore(room: EscapeRoom): DocumentData {
    return {
      name: room.name,
      company: room.company,
      location: room.location,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): EscapeRoom {
    const data = snapshot.data(options)!;
    return new EscapeRoom(data.name, data.company, data.location);
  },
};
