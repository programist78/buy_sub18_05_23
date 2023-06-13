import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });
  if (!isLoaded) return <div>Loading</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 40.773998, lng: -73.966003 }), []);
  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
