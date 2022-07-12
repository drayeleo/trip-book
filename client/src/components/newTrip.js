import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import UploadAndDisplayImage from "./uploadAndDisplayImage";

export default function NewTrip() {
  let navigate = useNavigate();
  const [user, setUser] = useOutletContext();

  const [formData, setFormData] = useState({
    tripName: "",
    tripSummary: "",
  });
  const [errors, setErrors] = useState(null);

  function onChangeInput(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onClickSubmit(e) {
    e.preventDefault();
    console.log("Trip submitted!");

    const body = {
      trip_name: formData.tripName,
      trip_summary: formData.tripSummary,
    };

    fetch("/trips", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        res.json().then((trip) => {
          console.log(trip);
          // let temp = [...user.trips]
          setUser({ ...user, trips: [...user.trips, trip] });
          navigate("/trips/" + trip.id);
        });
      } else {
        res.json().then((json) => {
          // setUser(null);
          setErrors(json.errors);
          console.log("error: ", json);
        });
      }
    });
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);

    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
  }

  return (
    <div>
      <h1>New Trip</h1>
      <form>
        <input
          type="text"
          name="tripName"
          placeholder="Trip Name"
          onChange={onChangeInput}
        ></input>
        <input
          type="text"
          name="tripSummary"
          placeholder="Trip Summary"
          onChange={onChangeInput}
        ></input>
        <button onClick={onClickSubmit}>Create Trip</button>
      </form>
      {errors ? <p>Error: {errors}</p> : null}
      <br />
      <br />
      {/* <img
        src="/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--82835252ff04958682a3d074134ad1783611d8d6/20210430_133723_HDR.jpg"
        alt="none"
      /> */}
      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
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
      <UploadAndDisplayImage /> */}
    </div>
  );
}
