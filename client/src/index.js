import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import exifr from "exifr";

import LandingPage from "./components/landingPage";
import NewTrip from "./components/newTrip";
import Trips from "./components/trips";
import Trip from "./components/trip";
import UserProfile from "./components/userProfile";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import EditTrip from "./components/editTrip";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="new-trip" element={<NewTrip />} />
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:tripId" element={<Trip />} />
          <Route path="trips/:tripId/edit" element={<EditTrip />} />
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
