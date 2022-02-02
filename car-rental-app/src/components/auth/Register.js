import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadharCardNo, setAadharCardNo] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/register", {
        name,
        contactNo,
        email,
        password,
        aadharCardNo,
        role: "customer",
      })
      .then((res) => {
        setError("");
        setEmail("");
        setPassword("");
        history.push("/");
      })
      .catch(error => setError(error.response.data.message));
  };

  return (
    <div className="loginContainer">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="loginFormContainer" onSubmit={register}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Name"
            aria-label="default input example"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            className="form-control"
            type="number"
            placeholder="Enter Contact Number"
            aria-label="default input example"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          ></input>
        </div>
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
        <div className="mb-3">
          <label className="form-label">Aadhar Card Number</label>
          <input
            className="form-control"
            type="number"
            placeholder="Enter Aadhar Card Number"
            aria-label="default input example"
            value={aadharCardNo}
            onChange={(e) => setAadharCardNo(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
