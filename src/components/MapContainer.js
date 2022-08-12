import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { ESCAPE_ROOM_FILE, GOOGLE_MAPS_API_KEY } from "../common/Constants";
import escapeRoomDetails from "./../data/terpeca-2021-round1.txt";
import "./MapContainer.css";

export default function MapContainer() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  parseEscapeRoomDetails();

  return (
    <GoogleMap
      id="escape-room-map"
      zoom={10}
      center={{
        lat: 44,
        lng: -80,
      }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}

function parseEscapeRoomDetails() {
  const content = escapeRoomDetails;
  const details = content.split(/\r?\n/);

  var escapeRooms = [];

  details.forEach(function (entry) {
    var room = {};
    const location = entry.match(/\([^,)]+(?:[,][^,)]+)+\)/);

    var substring = entry.split(/\([^,)]+(?:[,][^,)]+)+\)/);
    var nameAndCompany = substring[0].split(/(\ \-\ )(?!.*\ \-\ )/);
    var name = "";
    var company = "";

    if (nameAndCompany.length != 3) {
      console.error(`Entry does not adhere to proper formatting: ${entry}`);
    } else {
      name = nameAndCompany[0].replace(/\[.*\]/, "");
      company = nameAndCompany[2];
    }

    room["name"] = name;
    room["company"] = company;
    room["location"] = location[0];
    escapeRooms.push(room);
  });

  console.log(escapeRooms);
}
