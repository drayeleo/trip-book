import { useEffect, useState } from "react";

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
    if (trips) {
      if (trips[0]) {
        return trips.map((trip) => <TripCard trip={trip} key={trip.id} />);
      } else {
        return (
          <h3>
            You don't have any trips yet! Select "New Trip" to create one.
          </h3>
        );
      }
    } else {
      return null;
    }
  }

  return (
    <div id="my-trips">
      <div>
        <h1>My Trips</h1>
        <div id="trip-cards-container">
          {/* {trips && trips[0] ? renderTrips() : <h3>No trips yet!</h3>} */}
          {renderTrips()}
        </div>
      </div>
    </div>
  );
}
