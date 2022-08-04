import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import TempUploadImage from "./tempUploadImage";
import ExistingImageCard from "./existingImageCard";

export default function EditTrip() {
  let params = useParams();
  const [trip, setTrip] = useState();

  console.log(trip);

  // fetch specified trip, including image urls and coordinates
  useEffect(() => {
    fetch(`/trips/${params.tripId}`)
      .then((response) => response.json())
      .then((data) => setTrip(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
      {/* <h1>Edit Trip</h1> */}
      <TempUploadImage />
      {trip && trip.locations[0] ? (
        <h2>Current Images:</h2>
      ) : // <h2>No images have been uploaded yet</h2>
      null}
      <div id="image-cards-container">
        {trip && trip.locations[0] ? displayImages() : null}
      </div>
    </div>
  );
}
