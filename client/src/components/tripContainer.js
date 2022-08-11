import { Outlet } from "react-router-dom";

import TripHeader from "./tripHeader";

export default function TripContainer() {
  return (
    <div>
      <TripHeader trip={trip} page="trip" />
      <Outlet />
    </div>
  );
}
