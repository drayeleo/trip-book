import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function LoginPage() {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      } else {
        res.json().then((json) => {
          setError(json.error);
          console.log("error: ", json.error);
        });
      }
    });
  }

  return (
    <div id="login">
      <div></div>
      <div className="centered-block">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submitbutton">
            Login
          </button>
          {error ? <p>Error: {error}</p> : null}
        </form>
      </div>
    </div>
  );
}
