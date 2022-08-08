import { useOutletContext } from "react-router-dom";

import TripCard from "./tripCard";

export default function Trips() {
  const [user, setUser] = useOutletContext();

  function renderTrips() {
    if (user) {
      if (user.trips[0]) {
        return user.trips.map((trip) => <TripCard trip={trip} key={trip.id} />);
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
        <div id="trip-cards-container">{renderTrips()}</div>
      </div>
    </div>
  );
}
