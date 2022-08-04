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

export default function SignupPage() {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();

  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    if (user) {
      // console.log("navigating to homepage")
      navigate("/");
    }
  }, [user]);

  function handleFormInput(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      } else {
        res.json().then((json) => {
          // setUser(null);
          // console.log("json: ", json)
          setErrors(json.errors);
          console.log("errors: ", json.errors);
        });
      }
    });
  }

  return (
    <div id="signup">
      <div></div>
      <div className="centered-block">
        <h2>Sign Up for Trip Book!</h2>
        <form onSubmit={handleSubmit}>
          <label className="signupform" htmlFor="firstName"></label>
          <input
            // style={inputStyles}
            type="text"
            id="firstName"
            name="firstName"
            placeholder=" First Name"
            value={formData.firstName}
            onChange={(e) => handleFormInput(e)}
          />
          <label htmlFor="lastName"></label>
          <input
            // style={inputStyles}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleFormInput(e)}
          />
          <label htmlFor="username"></label>
          <input
            // style={inputStyles}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => handleFormInput(e)}
          />
          <label htmlFor="password"></label>
          <input
            // style={inputStyles}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={(e) => handleFormInput(e)}
          />
          <label htmlFor="passwordConfirmation"></label>
          <input
            // style={inputStyles}
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            value={formData.passwordConfirmation}
            onChange={(e) => handleFormInput(e)}
          />
          <button type="submit" className="submitbutton">
            Submit
          </button>
          {errors ? <p>Error: {errors}</p> : null}
        </form>
      </div>
    </div>
  );
}
