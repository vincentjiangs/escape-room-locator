import { DocumentData, SnapshotOptions, QueryDocumentSnapshot, arrayUnion } from "firebase/firestore";

interface IEscapeRoom {
  name: string;
  company: string;
  location: string;
  nominationYears: Array<number>;
  lat?: number;
  lng?: number;
  toString(): string;
}

export class EscapeRoom implements IEscapeRoom {
  name: string;
  company: string;
  location: string;
  nominationYears: Array<number>;
  lat?: number;
  lng?: number;

  constructor(room: IEscapeRoom) {
    this.name = room.name;
    this.company = room.company;
    this.location = room.location;
    this.nominationYears = room.nominationYears;
  }

  toString() {
    return this.name + "@@@" + this.company + "@@@" + this.location;
  }
}

export class EscapeRoomBuilder implements Partial<IEscapeRoom> {
  name: string;
  company: string;
  location: string;
  nominationYears: Array<number>;
  lat?: number;
  lng?: number;

  withName(name: string): this & Pick<IEscapeRoom, "name"> {
    return Object.assign(this, { name: name });
  }

  withCompany(company: string): this & Pick<IEscapeRoom, "company"> {
    return Object.assign(this, { company: company });
  }

  withLocation(location: string): this & Pick<IEscapeRoom, "location"> {
    return Object.assign(this, { location: location });
  }

  withNominationYears(nominationYears: Array<number>): this & Pick<IEscapeRoom, "nominationYears"> {
    return Object.assign(this, { nominationYears: nominationYears });
  }

  withLat(lat: number): this & Pick<IEscapeRoom, "lat"> {
    return Object.assign(this, { lat: lat });
  }

  withLng(lng: number): this & Pick<IEscapeRoom, "lng"> {
    return Object.assign(this, { lng: lng });
  }

  build(this: IEscapeRoom) {
    return new EscapeRoom(this);
  }
}

export const escapeRoomConverter = {
  toFirestore(room: EscapeRoom): DocumentData {
    return {
      name: room.name,
      company: room.company,
      location: room.location,
      nominationYears: arrayUnion(room.nominationYears),
      ...(room.lat != null && room.lat != undefined && { lat: room.lat }),
      ...(room.lng != null && room.lng != undefined && { lng: room.lng }),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): EscapeRoom {
    const data = snapshot.data(options)!;
    const builder = new EscapeRoomBuilder()
      .withName(data.name)
      .withCompany(data.company)
      .withLocation(data.location)
      .withNominationYears(data.nominationYears);
    if (data.lat != null && data.lat != undefined) {
      builder.withLat(data.lat);
    }
    if (data.lng != null && data.lng != undefined) {
      builder.withLng(data.lng);
    }
    return builder.build();
  },
};
