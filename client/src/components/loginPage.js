import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

// const inputStyles = {
//   padding: "10px",
//   border: "3px solid #9198e5",
//   boxShadow: "0px 0px 0px",
//   color: "#3a46c2;",
//   font_size: "18px",
//   background_color: "#9198e5",
//   outline: "10px",
//   borderRadius: "10px",
//   width: "20%",
//   margin: "10px 0",

// };

export default function LoginPage() {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      // console.log("navigating to homepage")
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
          // setUser(null);
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
            // style ={inputStyles}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            // style ={inputStyles}
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
