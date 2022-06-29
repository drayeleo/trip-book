import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav>
        <Link to="/new-trip">New Trip</Link> |{" "}
        <Link to="/my-trips">My Trips</Link> |{" "}
        <Link to="/my-profile">My Profile</Link>
      </nav>
    </div>
  );
}
