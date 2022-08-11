import { Marker, Popup } from "react-leaflet";

export default function ImageMarker({ url, latitude, longitude }) {
  return (
    <>
      <Marker position={[latitude, longitude]}>
        <Popup>
          <img src={url} alt={"none"} width={"300px"} />
        </Popup>
      </Marker>
    </>
  );
}
