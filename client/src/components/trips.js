import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Trips() {
  let navigate = useNavigate();

  const [trips, setTrips] = useState();

  useEffect(() => {
    fetch("/trips").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setTrips(data);
          console.log(data);
        });
      } else {
        res.json().then((json) => {
          console.log("error: ", json.error);
        });
      }
    });
  }, []);

  function handleViewTrip(tripId) {
    navigate("/trips/" + tripId);
  }

  function renderTrips() {
    return trips.map((trip) => {
      return (
        <div key={trip.id}>
          <h2>{trip.trip_name}</h2>
          <h3>{trip.trip_summary}</h3>
          <button onClick={() => handleViewTrip(trip.id)}>View Trip</button>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>My Trips</h1>
      {trips ? renderTrips() : null}
    </div>
  );
}
