// complete

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useRef, FormEvent, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../../types";
import { UserContext } from "../../contexts/UserProvider";
import jwtDecode from "jwt-decode";

import {
  GoogleLogin,
  GoogleOAuthProvider,
  // googleLogout,
  // useGoogleLogin,
} from "@react-oauth/google";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const usernameField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  function handleLoginData(e: FormEvent<HTMLElement>) {
    e.preventDefault(); //this prevents refresh
    //using Partial bc User mandates username/email, but here we areo nly reuqiring one or theo hter
    const loginInfo: Partial<User> = {
      password: passwordField.current!.value,
    };
    if (usernameField.current?.value) {
      loginInfo.username = usernameField.current.value;
    } else if (emailField.current?.value) {
      loginInfo.email = emailField.current.value;
    } else {
      window.alert("Please include Username or Email");
      return;
    }
    clearForm();
    loginUser(loginInfo);
    navigate("/");
  }

  async function loginUser(loginInfo: Partial<User>) {
    //loginInfo here does NOT have to match loginInfo above. We just do it cuz it looks better
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    });
    if (res.ok) {
      const data = await res.json();
      const accessToken = data.access_token;
      console.log("LOGIN SUCCESSFUL ===============================");
      setUser({
        token: accessToken,
        username: loginInfo.username ? loginInfo.username : "",
      });
      localStorage.setItem("token", accessToken);
    } else window.alert("Failed Login");
  }

  function clearForm() {
    usernameField.current!.value = "";
    emailField.current!.value = "";
    passwordField.current!.value = "";
  }

  return (
    <Form className="py-4 px-4" onSubmit={handleLoginData}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            style={{ maxWidth: "450px" }}
            ref={usernameField}
            required
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          placeholder="Enter Email Address"
          style={{ maxWidth: "450px" }}
          ref={emailField}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Enter password"
          style={{ maxWidth: "450px" }}
          ref={passwordField}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="my-3">
        Submit
      </Button>
    </Form>
  );
}

// GOOGLE LOGIN BUTTON
export function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onSuccess = async (res) => {
    console.log("LOGIN SUCCESS! Current User: ");
    const userInfo: { sub: string; given_name: string } = jwtDecode(
      res.credential
    );
    const accessToken = userInfo.sub;
    setUser({
      token: accessToken,
      username: accessToken ? userInfo.given_name : "",
    });
    localStorage.setItem("token", accessToken);
    navigate("/");
    console.log(userInfo);
    console.log(localStorage, "====LOCAL STORAGE======");
  };

  const onFailure = () => {
    window.alert("Failed Login");
  };

  return (
    <div id="signInButton">
      <GoogleOAuthProvider clientId="347170407823-925dtteh57cakcpfu3dtlbneuttgpl1g.apps.googleusercontent.com">
        <GoogleLogin
          text="signin_with"
          onSuccess={onSuccess}
          onError={onFailure}
          // cookiePolicy={"single_host_origin"}
          // isSignedIn={true}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
