import React, { useEffect, useState } from "react";
import "./all.css";
import axios from "axios";

function All() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = () => {
    axios.get('http://localhost:3000/complaints/all').then((response) => {
      let resolvedComplaints = response.data;
      setComplaints(resolvedComplaints)
    });
  }

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = (id, status) => {
    const updatedComplaints = complaints.map((complaint) => {
      if (complaint.id === id) {
        return { ...complaint, status };
      }
      return complaint;
    });
    setComplaints(updatedComplaints);
  };

  return (
    <div className="complaints">
      <h2>Users' Complaints</h2>
      <div className="complaints-container">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint">
            <h3>{complaint.user}</h3>
            <p>{complaint.complaint}</p>
            <div className="status">
              <span>Status: {complaint.status}</span>
              <div className="status-buttons">
                <button
                  onClick={() => handleStatusChange(complaint.id, "Rejected")}
                  disabled={complaint.status !== "Pending"}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusChange(complaint.id, "Resolved")}
                  disabled={complaint.status !== "Pending"}
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleStatusChange(complaint.id, "In Progress")}
                  disabled={complaint.status !== "Pending"}
                >
                  In Progress
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All;
