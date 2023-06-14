import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function MapComponent({longitude, latitude}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });
  if (!isLoaded) return <div>Loading</div>;
  return <Map lat={Number(latitude)} lng={Number(longitude)} />;
}

function Map({lat, lng}) {
  const center = useMemo(() => ({ lat, lng }), []);
  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
