import { Link } from "react-router-dom";

export default function Header({ onLogout, user }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <div id="header">
      <nav>
        {user ? (
          <>
            <Link to="/new-trip">New Trip</Link>
            <Link to="/trips">My Trips</Link>
            {/* <Link to="/my-profile">My Profile</Link> */}
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
          </>
        )}
      </nav>
      <h1>
        <a href="/">TripBook</a>
      </h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
