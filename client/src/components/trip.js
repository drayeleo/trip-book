import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import ImageMarker from "./imageMarker";

export default function Trip() {
  let params = useParams();
  let navigate = useNavigate();

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

  // generate an array of just coordinates to feed into the "bounds" attribute for MapContainer
  function getCoords() {
    return trip.locations.map((location) => [
      location.latitude,
      location.longitude,
    ]);
  }

  function renderImages() {
    return trip.locations.map((location) => {
      return (
        <img
          key={location.image_url}
          width={"250px"}
          src={location.image_url}
          alt="none"
        />
      );
    });
  }

  // render one marker for each image in "trips"
  function renderMarkers() {
    return trip.locations.map((location) => {
      return (
        <ImageMarker
          key={location.id}
          url={location.image_url}
          latitude={location.latitude}
          longitude={location.longitude}
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
        {/* {renderImages()} */}
        {trip ? (
          <MapContainer bounds={getCoords()} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {renderMarkers()}
          </MapContainer>
        ) : null}
      </div>
    );
  }
}
