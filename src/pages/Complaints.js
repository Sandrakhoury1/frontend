import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import './Complaints.css';
import Navbar from '../components/Navbar';
import moment from 'moment/moment';
import axios from 'axios';

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);
  const [filterDate, setFilterDate] = useState('newest');
  const [filterStatus, setFilterStatus] = useState('all');


  const handleBodyInputChange = (event) => {
    setBodyValue(event.target.value);
  }

  const handleTitleInputChange = (event) => {
    setTitleValue(event.target.value);
  }

  const showComplaints = () => {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    axios.get('http://localhost:3000/complaints/User', {headers}).then((response) => {
      console.log(response.data)
      setComplaints(response.data)
    });
  }

  useEffect(() => {
    showComplaints();
  }, [refreshCount]);

  const add = () => {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    
    axios.post('http://localhost:3000/complaints/new', {title: titleValue, body: bodyValue}, {headers})

      .then(response => setRefreshCount( (prevState) => prevState + 1))

  }


  const handleAddComplaint = () => {
    if (titleValue.trim() === '' || bodyValue.trim() === '') {
      alert ('Please fill in all required fields');
      return;
    }

    add();
  };

  const filteredComplaints = complaints==='you have not issued any complaint !' ? [] : complaints
  .filter((complaint) => {
    if (filterStatus === 'all') {
      return true;
    } else {
      return complaint.status === filterStatus;
    }
  })
  .sort((a, b) => {
    const dateA = moment(a.createdDate).toDate();
    const dateB = moment(b.createdDate).toDate();
    if (filterDate === 'newest') {
      return dateB - dateA;
    } else if (filterDate === 'oldest') {
      return dateA - dateB;
    } else {
      return 0;
    }
  });

  function getStatusColorClass(status) {
    let colorClass = '';
    switch (status) {
      case 'INPROGRESS':
        colorClass = 'status-inprogress';
        break;
      case 'REJECTED':
        colorClass = 'status-rejected';
        break;
      case 'RESOLVED':
        colorClass = 'status-resolved';
        break;
      default:
        colorClass = 'status-pending';
    }
    return colorClass;
  };

  return (
    <>
      <main>
      <Navbar />
        <div className="add-complaint">
          <h2>Add New Complaint</h2>
          <label className='required'>Title:</label>
          <input
            className='ipt-add'
            type="text"
            name="title"
            value={titleValue}
            onChange={handleTitleInputChange}
          />
          <label className='required'>Description:</label>
          <textarea
            className='ipt-add'
            name="body"
            value={bodyValue}
            onChange={handleBodyInputChange}
          ></textarea> 
          <button onClick={handleAddComplaint}>Add Complaint</button>
        </div>
        <div className="filter-complaints">
          <div className='filter-container'> 
          <label>Date</label>
          <select value={filterDate} onChange={(event) => {setFilterDate(event.target.value)}}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          </div>
          <div className='filter-container'>
            <label>Status</label>
            <select value={filterStatus} onChange={(event) => {setFilterStatus(event.target.value)}}>
              <option value="all">All</option>
              <option value = "PENDING">Pending</option>
              <option value="INPROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div> 
        </div>
        <div className="complaints">
          <h2>Complaints List</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr key={index}>
                  <td>{complaint.title}</td>
                  <td>{complaint.body}</td>
                  <td>{moment(complaint.createdDate).format('YYYY-MM-DD')}</td>
                  <td className={getStatusColorClass(complaint.status)}>{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </main>
  <Footer />
</>
);
}

 export default Complaints;