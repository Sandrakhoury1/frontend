import React, { useState, useEffect } from 'react';
import './AdminComplaints.css';
import './NavBarAdmin';
import NavBarAdmin from './NavBarAdmin';
import moment from 'moment';
import axios from 'axios';

function Rejected() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');

  const rejected = complaints
  .filter(complaint => {
    return complaint.status === 'REJECTED'})
  .filter(complaint => {
    let x = complaint.User.firstName.toLowerCase() + " " + complaint.User.lastName.toLowerCase();
    return x.includes(search.toLowerCase());
  })
  .sort((a, b) => {
    const dateA = moment(a.createdDate).toDate();
    const dateB = moment(b.createdDate).toDate();
    return dateB - dateA;
  });

  const fetchComplaints = () => {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    axios.get('http://localhost:3000/complaints/all', {headers}).then((response) => {
      let rejectedComplaints = response.data[0];
      setComplaints([...rejectedComplaints.Vip, ...rejectedComplaints.nonVip])
    });
  }

  useEffect(() => {
    fetchComplaints();
  }, []);


  const complaintsTable = (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rejected.map(complaint => (
          <tr key={complaint._id}>
            <td>{complaint.User.email}</td>
            <td>{complaint.User.firstName} {complaint.User.lastName}</td>
            <td>{complaint.title}</td>
            <td>{complaint.body}</td>
            <td>{moment(complaint.createdDate).format('YYYY-MM-DD')}</td>
            <td>{complaint.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return (
    <div>
      <NavBarAdmin />
      <div className="complaints-container">
        <div className="search-container">
          <input className='search' type="text" placeholder="Search by Name" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        {complaintsTable}
      </div>
  </div>
  );
};

export default Rejected;
