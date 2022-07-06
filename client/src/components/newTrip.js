import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import UploadAndDisplayImage from "./uploadAndDisplayImage";

export default function NewTrip() {
  return (
    <div>
      <h1>New Trip</h1>
      {/* <img
        src="/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--82835252ff04958682a3d074134ad1783611d8d6/20210430_133723_HDR.jpg"
        alt="none"
      /> */}
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <UploadAndDisplayImage />
    </div>
  );
}
