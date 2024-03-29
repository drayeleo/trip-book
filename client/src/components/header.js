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
          </>
        ) : null}
      </nav>
      <h1>
        <Link to="/">Trip Book</Link>
      </h1>
      <div>{user ? <button onClick={handleLogout}>Logout</button> : null}</div>
    </div>
  );
}
