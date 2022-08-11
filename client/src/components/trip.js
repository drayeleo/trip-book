import { useParams, useOutletContext } from "react-router-dom";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import ImageMarker from "./imageMarker";
import TripHeader from "./tripHeader";

export default function Trip() {
  let params = useParams();

  const [user, setUser] = useOutletContext();

  let trip;
  if (user) {
    trip = user.trips.find((trip) => trip.id === parseInt(params.tripId));
  }

  // console.log("user in trip.js: ", user);

  // generate an array of coordinates to feed into the "bounds" attribute for MapContainer
  function getCoords() {
    if (trip.locations[0]) {
      return trip.locations.map((location) => [
        location.latitude,
        location.longitude,
      ]);
    } else {
      return [
        [47.401028, -67.584289],
        [24.35424, -129.902779], // default bounds are US/North America
      ];
    }
  }

  // render one marker for each image in "trips"
  function renderMarkers() {
    return (
      <MarkerClusterGroup>
        {trip.locations.map((location) => {
          return (
            <ImageMarker
              key={location.id}
              url={location.image_url}
              latitude={location.latitude}
              longitude={location.longitude}
            />
          );
        })}
      </MarkerClusterGroup>
    );
  }

  function renderBaseLayers() {
    return (
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
    );
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
              {renderBaseLayers()}
              {renderMarkers()}
            </MapContainer>
          ) : null}
        </div>
      </div>
    );
  }
}
