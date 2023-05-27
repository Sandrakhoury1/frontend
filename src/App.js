import React from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import jwt_decode from "jwt-decode";
import { Routes, Route, Navigate } from 'react-router-dom';
import Complaints from './pages/Complaints';
import Home from './pages/Home';
import About from './pages/About';
import AllComplaints from './admin/AllComplaints';
import Pending from './admin/Pending';
import Resolved from './admin/Resolved';
import Rejected from './admin/Rejected';
import Inprogress from './admin/Inprogress';
import VipComplaints from './admin/VipComplaints';
import NonVipComplaints from './admin/NonVipComplaints';
import Dashboard from './admin/Dashboard';

function App() {
  const accessToken = localStorage.getItem("token");
  let admin = false;

  if (accessToken && accessToken !== "undefined") {
    const tokenDecoded = jwt_decode(accessToken);
    console.log(tokenDecoded);
    admin = tokenDecoded.isAdmin;
  } else {
    if (accessToken != null) {
      console.log("missing token", accessToken);
    }
  }

  return (
    <Routes>
      <Route
        exact path = "/"
        element = {accessToken && !admin ? <Navigate to = '/home'/> : <Login />}
      />
      <Route 
        path = "/home"
        element = {accessToken && !admin ? <Home /> : <Navigate to = "/" />}
      />
      <Route path = "/dashboard"
        element = {accessToken && admin ? <Dashboard /> : <Navigate to= "/"/>}
      />
      <Route path = "/login" element={<Login />} />
      <Route path = "/signup" element={<Signup />} />
      <Route path='/complaints' element={<Complaints />} />
      <Route path='/about' element={<About />} />
      <Route path = '/allcomplaints' element={<AllComplaints />} />
      <Route path = '/complaints/pending' element={<Pending />} />
      <Route path ='/complaints/resolved' element ={<Resolved />} />
      <Route path = '/complaints/rejected' element={<Rejected />} />
      <Route path = 'complaints/inprogress' element={<Inprogress/>} />
      <Route path = '/complaints/non-vip' element={<NonVipComplaints/>} />
      <Route path = '/complaints/vip' element={<VipComplaints/>}/>
    </Routes>
  );
}

export default App;