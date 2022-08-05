import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
// import "react-leaflet-markercluster/dist/styles.min.css";

import ImageMarker from "./imageMarker";
import TripHeader from "./tripHeader";

export default function Trip() {
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

  // generate an array of just coordinates to feed into the "bounds" attribute for MapContainer
  function getCoords() {
    console.log("getCoords: ", trip);
    if (trip.locations[0]) {
      console.log("tryna return nonexistent coords");
      return trip.locations.map((location) => [
        location.latitude,
        location.longitude,
      ]);
    } else {
      console.log("returning generic coords");
      return [
        [47.401028, -67.584289],
        [24.35424, -129.902779],
      ];
    }
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
      <div id="trip">
        <TripHeader trip={trip} page="trip" />
        <div id="container">
          {trip ? (
            <MapContainer
              bounds={getCoords()}
              scrollWheelZoom={true}
              boundsOptions={{ padding: [50, 50] }}
            >
              <LayersControl position="topright">
                <LayersControl.BaseLayer name="OpenStreetMap">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
                {/* <LayersControl.BaseLayer name="CyclOSM">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">CyclOSM</a> contributors'
                  url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer> */}
                <LayersControl.BaseLayer name="Google Satellite">
                  <TileLayer
                    attribution='&copy; <a href="https://mapsplatform.google.com/">Google Maps</a>' //need to update urls for google maps
                    url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    subdomains={["mt1", "mt2", "mt3"]}
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked name="Google Terrain">
                  <TileLayer
                    attribution='&copy; <a href="https://mapsplatform.google.com/">Google Maps</a>' //need to update urls for google maps
                    url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Google Hybrid">
                  <TileLayer
                    attribution='&copy; <a href="https://mapsplatform.google.com/">Google Maps</a>' //need to update urls for google maps
                    url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                  />
                </LayersControl.BaseLayer>
              </LayersControl>
              <MarkerClusterGroup>{renderMarkers()}</MarkerClusterGroup>
              {/* {renderMarkers()} */}
            </MapContainer>
          ) : null}
        </div>
      </div>
    );
  }
}
