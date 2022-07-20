import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TripCard from "./tripCard";

export default function Trips() {
  // let navigate = useNavigate();

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

  // function handleViewTrip(tripId) {
  //   navigate("/trips/" + tripId);
  // }

  function renderTrips() {
    return trips.map((trip) => <TripCard trip={trip} key={trip.id} />);
  }

  return (
    <div id="my-trips">
      <div>
        <h1>My Trips</h1>
        <div id="trip-cards-container">
          {trips && trips[0] ? renderTrips() : <h3>No trips yet!</h3>}
        </div>
      </div>
    </div>
  );
}
