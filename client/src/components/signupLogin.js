import { useNavigate } from "react-router-dom";

export default function SignupLogin() {
  let navigate = useNavigate();

  return (
    <div id="signup-login">
      <div></div>
      <div className="centered-block">
        <h2>Signup/Login</h2>
        <h3>New? Make an account!</h3>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        <h3>Already signed up?</h3>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    </div>
  );
}
