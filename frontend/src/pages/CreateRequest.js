import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './CreateRequest.css'; 
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js

function CreateRequest() {

  const [id, setId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const { login, currentUser } = useAuth();
  const [availability, setAvailability] = useState('');
  const {user, logout} = useAuth(); //GET LOGGED USER INFORMATION!!
  const [rentalDuration, setRentalDuration] = useState('');

  const [renterEmail, setrenterEmail] = useState('');


  const handleRenterEmail = (e) => {
    setrenterEmail(e.target.value);
}
  const handleIdChange = (e) => {
      setId(e.target.value);
  }

  const handleBookTitleChange = (e) => {
      setBookTitle(e.target.value);
  }

  const handleRentalDurationChange = (e) => {
    setRentalDuration(e.target.value);
}

 const handleRequest = async (e) => {
  //should check if the inputted book exists in database in backend
  e.preventDefault();
  if (!user || !id || !bookTitle) {
        alert('Please complete all required fields');
    return;
  } 

  try {
    const response = await fetch('http://localhost:5000/createRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user": renterEmail,
        "id": id,
        "bookTitle": bookTitle,
        "rentalDuration": rentalDuration,
        "email": user?.email
    }),    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert(data.message);
        setAvailability('Pending');
    }
  } catch (error) {
    console.error('Error:', error);
  }
 };

 return (
    <div className="create-request-container"> 
     <h1 className="create-request-header">Rent A Book</h1>
     <form onSubmit={handleRequest} className="create-request-form">
        <div classname="form-group">
            <label htmlFor="bookTitle" className="form-label">Book Title:</label>
            <input
              type="text"
              id="bookTitle"
              value={bookTitle}
              onChange={handleBookTitleChange}
              className="form-input"
            />
        </div>
        <div classname="form-group">
            <label htmlFor="author" className="form-label">Renter's email :</label>
            <input
              type="text"
              id="user"
              value={renterEmail}
              onChange={handleRenterEmail}
              className="form-input"
            />
        </div>
        <div classname="form-group">
            <label htmlFor="bookType" className="form-label">Listing ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={handleIdChange}
              className="form-input"
            />
        </div>
        <div classname="form-group">
            <label htmlFor="bookType" className="form-label">Enter Rental Duration in Days You Would Like</label>
            <input
              type="text"
              id="id"
              value={rentalDuration}
              onChange={handleRentalDurationChange}
              className="form-input"
            />
        </div>
        <div className="form-group">
        <label htmlFor="email" className="form-label">Your email </label>
          <span className="form-label">
                        {
                            String(user?.email)
                        
                        }
                    </span>
                    
      </div>
        <button type="submit" className="form-button">Submit</button>
     </form>
     <p>Go back to <Link to="/" className="form-link"> Account</Link></p>
    </div>
 );
}
export default CreateRequest;