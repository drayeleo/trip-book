import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import exifr from "exifr";

export default function ImageMarker({ url }) {
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });

  // debugger;

  useEffect(() => {
    const getImageCoords = async () => {
      let coords = await exifr.gps("http://localhost:4000" + url);
      setCoords(coords);
    };
    getImageCoords();
  }, []);

  return (
    <div>
      <Marker position={[coords.latitude, coords.longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </div>
  );
}
