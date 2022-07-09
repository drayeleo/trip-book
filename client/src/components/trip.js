import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Trip() {
  let params = useParams();
  let navigate = useNavigate();

  const [trip, setTrip] = useState();
  console.log(trip);

  useEffect(() => {
    fetch(`/trips/${params.tripId}`)
      .then((response) => response.json())
      .then((data) => setTrip(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function renderImages() {
    return trip.image_data.map((imageDatum) => {
      return (
        <img
          key={imageDatum.image_url}
          width={"250px"}
          src={imageDatum.image_url}
          alt="none"
        />
      );
    });
  }

  if (trip) {
    return (
      <div>
        <h2>{trip.trip_name}</h2>
        <button onClick={() => navigate("/trips/" + trip.id + "/edit")}>
          Edit Trip
        </button>
        {renderImages()}
      </div>
    );
  }
}
