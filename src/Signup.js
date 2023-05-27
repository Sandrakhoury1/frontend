import React, { useState } from "react";
import "./Sign.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Signup() {
const [firstName, setFirstname] = useState("");
const [lastName, setLastname] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isAdmin, setIsAdmin] = useState(false);
const [isVip, setIsVip] = useState(false);
const [showPassword, setShowPassword] = useState(0);
const [error, setError] = useState(null);
 
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/signup', {firstName, lastName, email, password, isVip, isAdmin});
      window.location.href = '/login';
    } catch (error) {
      setError("Sign Up failed")
    }
  };

  return (
    <div>
    <div className="container-sign">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="form">
      <input
          className="ipt"
          type="text"
          placeholder="Firstname"
          value={firstName}
          onChange={(event) => setFirstname(event.target.value)}
        />
        <input
          className="ipt"
          type="text"
          placeholder="Lastname"
          value={lastName}
          onChange={(event) => setLastname(event.target.value)}
        />
        <input
          className="ipt"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="password-toggle-container">
        <input
          className="ipt password-input"
          type= {showPassword ? 'text' : 'password'}
          name = "password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye} 
        onClick = {() => setShowPassword(!showPassword)}
        className="password-toggle-icon"
        />
        </div>
        <div className="checkbox-group">
        <div>
          <label>
            <input
              className="ipt"
              type="checkbox"
              checked={isAdmin}
              onChange={(event) => setIsAdmin(event.target.checked)}
            />
            Admin
          </label>
          </div>
          <div>
          <label>
            <input
              className="ipt"
              type="checkbox"
              checked={isVip}
              onChange={(event) => setIsVip(event.target.checked)}
            />
            VIP
          </label>
          </div>
        </div>
        <button className="signBtn" type="button" onClick={handleSignup}>
          Sign Up
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
    </div>
  );
};

export default Signup;
