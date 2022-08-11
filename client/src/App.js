import "./App.css";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header";

export default function App() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sessionCheckComplete, setSessionCheckComplete] = useState(false);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user);
          console.log(user);
        });
      }
      setSessionCheckComplete(true);
    });
  }, []);

  function onLogout() {
    setUser(null);
    navigate("/");
  }

  // console.log(user);

  return (
    <div className="App">
      <Header onLogout={onLogout} user={user} />
      <div id="content">
        {sessionCheckComplete ? (
          <Outlet context={[user, setUser]} />
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
}
