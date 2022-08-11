import { useParams, useOutletContext } from "react-router-dom";

import UploadImages from "./uploadImages";
import ExistingImageCard from "./existingImageCard";
import TripHeader from "./tripHeader";

export default function EditTrip() {
  let params = useParams();

  const [user, setUser] = useOutletContext();

  let trip;
  if (user) {
    trip = user.trips.find((trip) => trip.id === parseInt(params.tripId));
  }

  function displayImages() {
    return trip.locations.map((location, index) => {
      return (
        <ExistingImageCard
          key={index}
          url={location.image_url}
          latitude={location.latitude}
          longitude={location.longitude}
          index={index}
        />
      );
    });
  }

  return (
    <div id="edit-trip">
      {trip ? <TripHeader trip={trip} page="edit" /> : null}
      <UploadImages />
      {trip && trip.locations[0] ? (
        <>
          <h2>Current Images:</h2>
          <div id="image-cards-container">{displayImages()}</div>
        </>
      ) : null}
    </div>
  );
}
