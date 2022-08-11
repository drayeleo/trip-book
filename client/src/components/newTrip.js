import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        res.json().then((trip) => {
          console.log(trip);
          setUser({ ...user, trips: [...user.trips, trip] });
          navigate("/trips/" + trip.id);
        });
      } else {
        res.json().then((json) => {
          setErrors(json.errors);
          console.log("error: ", json);
        });
      }
    });
  }

  return (
    <div id="new-trip">
      <div></div>
      <div className="centered-block">
        <h2>New Trip</h2>
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
      </div>
    </div>
  );
}
