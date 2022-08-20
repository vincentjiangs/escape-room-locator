import * as React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { EscapeRoom } from "../models/EscapeRoom";

interface MarkerComponentProps {
  room: EscapeRoom;
  index: number;
}

export default function MarkerComponent(props: MarkerComponentProps) {
  const room = props.room;

  const [activeMarker, setActiveMarker] = useState();

  const onMarkerClick = (marker: MarkerType) => {
    setActiveMarker(true);
    console.log(marker);
  };

  return (
    <Marker
      position={new google.maps.LatLng(room.lat, room.lng)}
      animation={google.maps.Animation.DROP}
      label={props.index.toString()}
      onClick={() => onMarkerClick(marker)}
    ></Marker>
  );
}
