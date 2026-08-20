import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ReportUser.css';
import {MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBCardFooter, MDBBtn} from 'mdb-react-ui-kit'; // Import MDB React UI Kit

const ReportUser = () => {
  const [userEmail, setUserEmail] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a new report
    fetch('http://localhost:5000/report_user', { // Replace with your Flask server URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail,
        reason: reason,
        description: description
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // After handling the report, you might want to redirect the user or display a confirmation message
      if (data.success) {
        alert('Report was successfully sent!');
      } else {
        alert('Report failed to send. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  };

  return (
    <MDBCard className='mt-5 d-flex align-items-center justify-content-center'>
      <h2 className='mt-5 d-flex align-items-center justify-content-center'>Report User</h2>
      <form onSubmit={handleSubmit} className="report-user-form">
        <div className='mt-5 d-flex align-items-center justify-content-center'>
          <label htmlFor="userId" className="form-label">User Email:</label>
          <input
            type="text"
            id="userEmail"
            value={userEmail}
            onChange={handleUserEmailChange}
            className="form-input"
            required
          />
        </div>
        <div className='mt-5 d-flex align-items-center justify-content-center'>
          <label htmlFor="reason" className="form-label">Reason:</label>
          <select
            id="reason"
            value={reason}
            onChange={handleReasonChange}
            className="form-input"
            required
          >
            <option value="">Select a reason</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="inappropriate content">Inappropriate Content</option>
            {/* Add more reasons as needed */}
          </select>
        </div>
        <div className='mt-5 d-flex align-items-center justify-content-center'>
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="form-textarea"
            required
          />
        </div>
        <button type="submit" className="form-button">Submit</button>
      </form>

      <p>Go back to <Link to="/Homepage" className="form-link">Homepage</Link></p>
    </MDBCard>
  );
}

export default ReportUser;
