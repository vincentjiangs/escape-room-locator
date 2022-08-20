import * as React from "react";
import escapeRoomDetails from "./../assets/terpeca-2021-round1.txt";
import { EscapeRoom, EscapeRoomBuilder } from "../models/EscapeRoom";
import RoomsMap from "./RoomsMap";
import { GOOGLE_MAPS_API_KEY } from "../common/Constants";
import { useJsApiLoader } from "@react-google-maps/api";
import { ScaleLoader } from "react-spinners";
import { useMemo, useState } from "react";

const zoom = 4;
const latlng = new google.maps.LatLng(37.77493, -122.419415);
const mapContainerDiv = "map-container";

export function MapContainer() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const escapeRoomsList = parseEscapeRoomDetails();

  const [isMapLoaded, setIsMapLoaded] = useState(isLoaded);
  const [mapLoadError, setMapLoadError] = useState(loadError);

  const mapCenter = useMemo(() => latlng, []);
  const mapOptions = {
    zoom: zoom,
    mapCenter: mapCenter,
    disableDefaultUI: true,
  };

  // TODO: Add ScaleLoader to div and conditionally render with state

  const mapObject = new google.maps.Map(document.getElementById(mapContainerDiv) as HTMLElement, mapOptions);

  // Check if map loaded successfully upon first render.
  google.maps.event.addListener(mapObject, "tilesloaded", () => {
    setIsMapLoaded(true);
    google.maps.event.clearListeners(mapObject, "tilesloaded");
  });
}

function parseEscapeRoomDetails(): EscapeRoom[] {
  const content = escapeRoomDetails;
  const details = (content as string).split(/\r?\n/);

  var escapeRoomsList = new Array<EscapeRoom>();

  details.forEach(function (entry: string) {
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

    var room = new EscapeRoomBuilder()
      .withName(name.trim())
      .withCompany(company.trim())
      .withLocation(location[0].trim().substring(1, location[0].length - 1))
      .withNominationYears([2021]);

    // TODO: Make this call Geocoding API for actual location
    var latOffset = Math.random() / 10;
    latOffset *= Math.round(Math.random()) ? 1 : -1;

    var lngOffset = Math.random() / 10;
    lngOffset *= Math.round(Math.random()) ? 1 : -1;

    room.withLat(37.77493 + latOffset);
    room.withLng(-122.419415 + lngOffset);

    escapeRoomsList.push(room.build());
  });

  console.log(escapeRoomsList);
  return escapeRoomsList;
}
