import { useOutletContext, useNavigate } from "react-router-dom";

export default function Trips() {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();

  function handleViewTrip(tripId) {
    navigate("/trips/" + tripId);
  }

  function renderTrips() {
    return user.trips.map((trip) => {
      // console.log(trip);
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
      {user ? renderTrips() : null}
    </div>
  );
}
