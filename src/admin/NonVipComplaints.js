import React, { useState, useEffect } from 'react';
import './AdminComplaints.css';
import './NavBarAdmin';
import NavBarAdmin from './NavBarAdmin';
import moment from 'moment';
import axios from 'axios';

function NonVipComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  console.log(complaints);
  const filteredComplaints = complaints === 'there are no complaints!' ? [] : complaints
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
      let allComplaints = response.data[0];
      setComplaints([...allComplaints.nonVip])
    });
  }

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChangeStatus = (_id, status) => {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    axios.patch(`http://localhost:3000/complaints/update/${_id}`, { status }, {headers}).then(() => {
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === _id ? { ...complaint, status } : complaint
        )
      );
    });
  };



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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredComplaints.map(complaint => (
          <tr key={complaint._id}>
            <td>{complaint.User.email}</td>
            <td>{complaint.User.firstName} {complaint.User.lastName}</td>
            <td>{complaint.title}</td>
            <td>{complaint.body}</td>  
            <td>{moment(complaint.createdDate).format('YYYY-MM-DD')}</td>
            <td>
              <input className='status-ipt' type = "text" value={complaint.status} onChange= {(event) => handleChangeStatus(complaint.id, event.target.value)} readOnly/>
            </td>
            <td>
              <button className='b btn-resolved' onClick={() => handleChangeStatus(complaint._id, 'RESOLVED')}>
                Resolved
              </button>
              <button className='b btn-rejected' onClick={() => handleChangeStatus(complaint._id, 'REJECTED')}>
                Rejected
              </button>
              <button className='b btn-inprogress' onClick={() => handleChangeStatus(complaint._id, 'INPROGRESS')}>
                InProgress
              </button>
            </td>
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
      <input className='search' type="text" placeholder="Search by Name" value={search} onChange={handleSearch} />
    </div>
    {complaintsTable}
  </div>
  </div>
  );
};

export default NonVipComplaints;