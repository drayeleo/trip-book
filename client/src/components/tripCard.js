import { useNavigate } from "react-router-dom";

export default function TripCard({ trip }) {
  let navigate = useNavigate();

  return (
    <div id="trip-card">
      <h2>{trip.trip_name}</h2>
      <h5>{trip.trip_summary}</h5>
      {trip.locations && trip.locations.length > 0 ? (
        <img src={trip.locations[0].image_url} width={"300px"} />
      ) : null}
      <button onClick={() => navigate("/trips/" + trip.id)}>View Trip</button>
    </div>
  );
}
