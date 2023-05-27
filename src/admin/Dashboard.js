import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";

function Dashboard() {
  const [numberUsers, setNumberUsers] = useState(0);
  const [allComplaints, setAllComplaints] = useState(0);
  const [pending, setPending] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [rejected, setRejected] = useState(0);

  const getNumberUsers = () => {
    axios
      .get('')
      .then((result) => setNumberUsers(result.data.count))
  };

  const getNumberAllComplaits = () => {
    axios
      .get('')
      .then((result) => setAllComplaints(result.data.count))
  };

  const getNumberPending = () => {
    axios
      .get('')
      .then((result) => setPending(result.data.count))
  };

  const getNumberResolved = () => {
    axios
      .get('')
      .then((result) => setResolved(result.data.count))
  };

  const getNumberProgress = () => {
    axios.get('')
    .then((result) => setInProgress(result.data.count))
  };

  const getNumberRejected = () => {
    axios.get('')
    .then((result) => setRejected(result.data.count))
  };

  useEffect(() => {
    getNumberUsers();
    getNumberAllComplaits();
    getNumberPending();
    getNumberResolved();
    getNumberProgress();
    getNumberRejected();
  }, []);

  return (
    <div>
    <NavBarAdmin />
    <div className="dash">
      <div className="item">
        <div className="label">Total Users</div>
        <div className="value">{numberUsers}</div>
      </div>
      <div className="item">
        <div className="label">All Complaints</div>
        <div className="value">{allComplaints}</div>
      </div>
      <div className="item">
        <div className="label">Pending Complaints</div>
        <div className="value">{pending}</div>
      </div>
      <div className="item">
        <div className="label">Resolved Complaints</div>
        <div className="value">{resolved}</div>
      </div>
      <div className="item">
        <div className="label">In Progress Complaints</div>
        <div className="value">{inProgress}</div>
      </div>
      <div className="item">
        <div className="label">Rejected Complaints</div>
        <div className="value">{rejected}</div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
