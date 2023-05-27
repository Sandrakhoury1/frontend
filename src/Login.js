import React, { useState } from "react";
import Signup from "./Signup";
import "./Sign.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import jwt_decode from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(0);
  const [error, setError] = useState(null);
 
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
    const response = await axios.post('http://localhost:3000/login', {email, password}, {
      headers: {'Content-Type': 'application/json'},
    });
    const data = response.data;
    localStorage.setItem('token', data.access_token);
    const typeOfUser = jwt_decode(data.access_token);
    if (typeOfUser.isAdmin) {
      window.location.href = '/complaints/vip';
    } else {
      window.location.href = '/home';
    }
  } catch (error) {
    console.error(error);
    if (error.response) {
      if (error.response.status === 401) {
        setError('Invalid username or password');
      } else if (error.response.status === 400) {
        setError('Wrong Password');
      } else if (error.response.status === 404) {
        setError('User not found');
      } else {
        setError('An error occured');
      }
    } else if (error.request) {
      setError('Network error');
    } else {
      setError('An error occured');
    }
  }
  };
 
  return (
    <div>
    <div className="container-sign">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <input
        className="ipt"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button className="signBtn" type="submit" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="signup-link">
        Don't have an account? <a href="/signup" element={<Signup />}>Sign up</a>
      </p>
    </div>
    </div>
  );
};

export default Login;
