import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import exifr from "exifr";

export default function ImageMarker({ url, latitude, longitude }) {
  // const [coords, setCoords] = useState({ latitude: "", longitude: "" });

  // debugger;

  // useEffect(() => {
  //   const getImageCoords = async () => {
  //     let coords = await exifr.gps("http://localhost:4000" + url);
  //     setCoords(coords);
  //   };
  //   getImageCoords();
  // }, []);

  return (
    <>
      <Marker position={[latitude, longitude]}>
        <Popup>
          {/* A pretty CSS3 popup. <br /> Easily customizable. */}
          <img src={url} alt={"none"} width={"300px"} />
        </Popup>
      </Marker>
    </>
  );
}
