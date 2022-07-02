import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewTrip from "./components/newTrip";
import MyTrips from "./components/myTrips";
import MyProfile from "./components/myProfile";
import LoginPage from "./components/loginPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="new-trip" element={<NewTrip />} />
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<p>There's nothing here!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
