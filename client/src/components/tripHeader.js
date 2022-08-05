import { useNavigate } from "react-router-dom";

export default function TripHeader({ trip, page }) {
  let navigate = useNavigate();

  function renderButton() {
    if (page === "trip") {
      return (
        <button onClick={() => navigate("/trips/" + trip.id + "/edit")}>
          Edit Trip
        </button>
      );
    } else if (page === "edit") {
      return (
        <button onClick={() => navigate("/trips/" + trip.id)}>View Trip</button>
      );
    }
  }

  return (
    <div id="trip-header">
      <h2>{trip.trip_name}</h2>
      <h4>{trip.trip_summary}</h4>
      <div>{renderButton()}</div>
    </div>
  );
}
