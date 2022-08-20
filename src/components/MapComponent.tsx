import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import * as React from "react";
import { useMemo } from "react";
import { ScaleLoader } from "react-spinners";
import { GOOGLE_MAPS_API_KEY } from "../common/Constants";
import { EscapeRoom } from "../models/EscapeRoom";
import MarkerComponent from "./MarkerComponent";
import "./MapComponent.css";

interface MapComponentProps {
  zoom: number;
  escapeRoomsList: EscapeRoom[];
  mapContainerDiv: string;
  latlng: google.maps.LatLng;
}

export default function MapComponent(props: MapComponentProps) {
  const mapCenter = useMemo(() => props.latlng, []);
  const mapOptions = {
    zoom: props.zoom,
    mapCenter: mapCenter,
    disableDefaultUI: true,
  };

  props.escapeRoomsList.forEach((room) => {
    const roomElement = getRoomLocation();
  });

  return (
    <GoogleMap options={mapOptions}>
      {props.escapeRoomsList.map((room: EscapeRoom, index: number, rooms: EscapeRoom[]) => {
        return <MarkerComponent room={room} index={index} />;
      })}
    </GoogleMap>
  );
}

function getRoomLocation() {}

// function getMarkers(mapObject: google.maps.Map, escapeRoomsList: EscapeRoom[]) {
//   escapeRoomsList.forEach((escapeRoom) => {
//     const markerPosition = {
//       lat: escapeRoom.lat,
//       lng: escapeRoom.lng,
//     };
//     const markerOptions = {
//       clickable: true,
//       map: mapObject,
//       title: escapeRoom.name,
//       position: markerPosition,
//     };
//     const marker = new google.maps.Marker(markerOptions);

//     google.maps.event.addListener(marker, "click", (marker: google.maps.Marker, escapeRoom: EscapeRoom) => {
//       return () => {
//         var infowindow = new google.maps.InfoWindow();
//         infowindow.setContent(escapeRoom.toString());
//         infowindow.open(mapObject, marker);
//       };
//     });
//   });
// }

// export function Map(mapContainer: string, center: google.maps.LatLng): google.maps.Map {
// export function Map(props: MapProps) {
//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   });

//   const mapCenter = useMemo(() => props.latlng, []);

//   const mapOptions = {
//     zoom: 4,
//     center: mapCenter,
//     disableDefaultUI: true,
//   };

//   const renderMap = () => {
//     // var map = new google.maps.Map(document.getElementById(props.mapContainerDiv) as HTMLElement, mapOptions);

//     // return map;

//     return (<GoogleMap ref={(map) => this._map = map} />)
//   };

//   if (loadError) {
//     return <div>Map cannot be loaded right now, sorry.</div>;
//   }

//   return isLoaded ? renderMap() : <ScaleLoader />;
// }
