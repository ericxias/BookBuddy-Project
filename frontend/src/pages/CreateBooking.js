// CreateBooking.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './CreateBooking.css';
import './general.css'; 

import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js
import Dropdown from 'react-dropdown'

const CreateBooking = () => {
  const [listingType, setListingType] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [listingDescription, setListingDescription] = useState('');
  const [price, setPrice] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [courseID, setCourseID] = useState('');
  const [school, setSchool] = useState('');
  const [bookType, setBookType] = useState('');
  const [rentalDuration, setRentalDuration] = useState('');
  const [bookCondition, setBookCondition] = useState('');
  const {user} = useAuth();
  const handleListingTypeChange = (e) => {
    setListingType(e.label);
  };
  
  const listingTypeOptions = ["Sale", "Rent"]

  const handleBookTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleListingDescriptionChange = (e) => {
    setListingDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleBookAuthorChange = (e) => {
    setBookAuthor(e.target.value);
  };

  const handleCourseIDChange = (e) => {
    setCourseID(e.target.value);
  };

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  const handleBookTypeChange = (e) => {
    setBookType(e.label);
  };

  const bookTypeOptions = ["Hard Cover", "Soft Cover", "Digital"]

  const handleRentalDurationChange = (e) => {
    setRentalDuration(e.target.value);
  };

  const handleBookConditionChange = (e) => {
    setBookCondition(e.label);
  };

  const bookConditionOptions = ["New", "Very Good", "Good", "OK", "Bad", "Very Bad"]

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    console.log('handleCreateBooking called');

    try {
      const response = await fetch('http://localhost:5000/createBookListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"listingType": listingType, "bookTitle": bookTitle, "listingDescription": listingDescription, 
        "price": price, "bookAuthor": bookAuthor, "courseID": courseID, "school": school, "bookType": bookType, 
        "rentalDuration": rentalDuration, "bookCondition": bookCondition, "user": user?.email, "availability": "Yes"}),
      });
      if (response.ok) {
        // Handle successful booking creation
        alert('Booking created successfully');
      } else {
        // Handle booking creation failure
        alert('Booking creation failed');

        const responseBody = await response.json();
        console.error('Booking creation failed with status:', response.status, 'and body:', responseBody);
        alert('Booking creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-booking-container"> {/* Apply a container class for styling */}
      <h1 className="create-booking-header">Create Booking</h1> {/* Apply a header class for styling */}
      <form onSubmit={handleCreateBooking} className="create-booking-form"> {/* Apply a form class for styling */}
        <div className="form-group">
          <label htmlFor="listingType" className="form-label">Listing Type (Sale/Rent):</label> {/* Apply label and input styles */}
          <Dropdown className="create-booking-dropdown" options={listingTypeOptions} onChange={handleListingTypeChange} value={listingType} placeholder="Please select a listing type option from this dropdown &#8595;" />
        </div>
        <div className="form-group">
        <label htmlFor="bookTitle" className="form-label">Book Title:</label> {/* Apply label and input styles */}
          <input
            type="text"
            id="bookTitle"
            value={bookTitle}
            onChange={handleBookTitleChange}
            className="form-input" // Apply input style
          />
        </div>
        <div className="form-group">
          <label htmlFor="listingDescription" className="form-label">Listing Description:</label> {/* Apply label and input styles */}
          <input
            type="text"
            id="listingDescription"
            value={listingDescription}
            onChange={handleListingDescriptionChange}
            className="form-input" // Apply input style
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">Price in Dollars:</label> {/* Apply label and input styles */}
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="form-input" // Apply input style
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookAuthor" className="form-label">Book Author:</label> {/* Apply label and input styles */}
          <input
            type="text"
            id="bookAuthor"
            value={bookAuthor}
            onChange={handleBookAuthorChange}
            className="form-input" // Apply input style
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseID" className="form-label">Course ID:</label> {/* Apply label and input styles */}
          <input
            type="text"
            id="courseID"
            value={courseID}
            onChange={handleCourseIDChange}
            className="form-input" // Apply input style
          />
        </div>
        <div className="form-group">
          <label htmlFor="school" className="form-label">School:</label> {/* Apply label and input styles */}
          <input
            type="text"
            id="school"
            value={school}
            onChange={handleSchoolChange}
            className="form-input" // Apply input style
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookType" className="form-label">Book Type (Hard Cover/Soft Cover/Digital):</label> {/* Apply label and input styles */}
          <Dropdown className="create-booking-dropdown" options={bookTypeOptions} onChange={handleBookTypeChange} value={bookType} placeholder="Please select a book type option from this dropdown &#8595;" />
        </div>
        <div className="form-group">
          <label htmlFor="rentalDuration" className="form-label">Rental Duration in Days (N/A if for Sale):</label> {/* Apply label and input styles */}
          <input
            type="text"
            id="rentalDuration"
            value={rentalDuration}
            onChange={handleRentalDurationChange}
            className="form-input" // Apply input style
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookCondition" className="form-label">Book Condition (New/Very Good/Good/OK/Bad/Very Bad):</label> {/* Apply label and input styles */}
          <Dropdown className="create-booking-dropdown" options={bookConditionOptions} onChange={handleBookConditionChange} value={bookCondition} placeholder="Please select a book condition option from this dropdown &#8595;" />
        </div>
        <button type="submit" className="create-booking-button">Create Book Listing</button> {/* Apply button style */}
      </form>
      <div className="create-booking-footer"> {/* Apply a footer class for styling */}
      <p>Go back to <Link to="/" className="form-link">Account</Link></p>

      </div>
    </div>
  );
}

export default CreateBooking;
