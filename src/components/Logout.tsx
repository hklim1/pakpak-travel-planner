import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { UserContext } from "../contexts/UserProvider";
// import { googleLogout, GoogleOAuthProvider } from '@react-oauth/google'

export default function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setUser({ username: "", token: "" });
    console.log(localStorage)
    navigate("/");
  }, []);

  return <Spinner />;
}
