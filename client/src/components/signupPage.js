import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

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
            type="text"
            id="firstName"
            name="firstName"
            placeholder=" First Name"
            value={formData.firstName}
            onChange={(e) => handleFormInput(e)}
          />
          <label htmlFor="lastName"></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleFormInput(e)}
          />
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => handleFormInput(e)}
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={(e) => handleFormInput(e)}
          />
          <label htmlFor="passwordConfirmation"></label>
          <input
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
