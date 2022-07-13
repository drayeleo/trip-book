import { useNavigate } from "react-router-dom";

export default function TripCard({ trip }) {
  let navigate = useNavigate();

  return (
    <div key={trip.id}>
      <h2>{trip.trip_name}</h2>
      <h3>{trip.trip_summary}</h3>
      {trip.locations && trip.locations.length > 0 ? (
        <img src={trip.locations[0].image_url} width={"300px"} />
      ) : null}
      <button onClick={() => navigate("/trips/" + trip.id)}>View Trip</button>
    </div>
  );
}
