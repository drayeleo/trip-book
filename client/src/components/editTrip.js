import { useParams, useOutletContext } from "react-router-dom";
import { useState } from "react";

import UploadImages from "./uploadImages";
import ExistingImageCard from "./existingImageCard";
import TripHeader from "./tripHeader";
import LoadingSpinner from "./loadingSpinner";

export default function EditTrip() {
  let params = useParams();

  const [user, setUser] = useOutletContext();

  const [uploading, setUploading] = useState(false);

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
      <UploadImages uploading={uploading} setUploading={setUploading} />
      {trip && trip.locations[0] ? (
        <>
          <h2>Current Images:</h2>
          <div id="image-cards-container">{displayImages()}</div>
        </>
      ) : null}
      {uploading ? <LoadingSpinner /> : null}
    </div>
  );
}
