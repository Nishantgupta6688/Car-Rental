import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ setLogoutUser, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        setUser({
          token: res.data.access_token,
          userName: email,
          role: res.data.role,
        });
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: res.data.access_token,
            userName: email,
            role: res.data.role,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        setLogoutUser(false);
        history.push("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (<div className="loginContainer">
    <div className="loginFormContainer">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={login}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br />
      <br />
      <h3>
        Don't have an account then do <Link to="/register">Register</Link>
      </h3>
    </div>
    </div>
  );
};

export default Login;
