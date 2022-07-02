import { useOutletContext } from "react-router-dom";
import NewTrip from "./newTrip";
import SignupLogin from "./signupLogin";

export default function LandingPage() {
  const [user, setUser] = useOutletContext();

  return <>{user ? <NewTrip /> : <SignupLogin />}</>;
}
