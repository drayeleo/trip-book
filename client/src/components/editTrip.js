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

  let tripIndex = user.trips.findIndex(
    (trip) => trip.id === parseInt(params.tripId)
  );
  // need to change trip below to tripIndex state to eliminate duplication of data

  let trip;
  if (user) {
    trip = user.trips.find((trip) => trip.id === parseInt(params.tripId));
  }

  function displayExistingImages() {
    return trip.locations.map((location, index) => {
      return (
        <ExistingImageCard
          key={index}
          url={location.image_url}
          latitude={location.latitude}
          longitude={location.longitude}
          index={index}
          deleteImage={deleteImage}
        />
      );
    });
  }

  function deleteImage(locationIndex) {
    console.log("running 'deleteImage' in editTrip");

    let locationId = user.trips[tripIndex].locations[locationIndex].id;

    fetch(`/locations/${locationId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        // delete from state
        let tempUser = { ...user };
        tempUser.trips[tripIndex].locations.splice(locationIndex, 1);
        setUser(tempUser);
      } else {
        res.json().then((json) => {
          console.log("error: ", json);
        });
      }
    });
  }

  return (
    <div id="edit-trip">
      {trip ? <TripHeader trip={trip} page="edit" /> : null}
      <UploadImages uploading={uploading} setUploading={setUploading} />
      {trip && trip.locations[0] ? (
        <>
          <h2>Current Images:</h2>
          <div id="image-cards-container">{displayExistingImages()}</div>
        </>
      ) : null}
      {uploading ? <LoadingSpinner /> : null}
    </div>
  );
}
