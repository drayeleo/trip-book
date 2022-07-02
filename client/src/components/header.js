import { Link } from "react-router-dom";

export default function Header({ onLogout, user }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <div>
      <nav>
        {user ? (
          <>
            <Link to="/new-trip">New Trip</Link> |{" "}
            <Link to="/my-trips">My Trips</Link> |{" "}
            <Link to="/my-profile">My Profile</Link> |{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
          </>
        )}
      </nav>
    </div>
  );
}
