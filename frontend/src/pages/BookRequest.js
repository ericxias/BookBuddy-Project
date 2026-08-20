import React, { useState } from 'react';
import './BookRequest.css'; 
import { Link } from 'react-router-dom';
import {MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBCardFooter, MDBBtn} from 'mdb-react-ui-kit'; // Import MDB React UI Kit

function BookRequest() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookType, setBookType] = useState('');
  const [condition, setCondition] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !author || !bookType || !condition || !priceRange) {
      alert('Please complete all required fields');
      return;
    }
    console.log(`Submitting request for book: ${title} by ${author}`);
    // Here you would typically send the form data to your server or Firebase
  };

  return (
    <MDBCard className='mt-5 d-flex align-items-center justify-content-center' onSubmit={handleSubmit}>
    <h2  className='mt-5 d-flex align-items-center justify-content-center'>
    Can't find the book you're looking for? Request it here!
    </h2>

      <div className="form-group">
        <label className="form-label" htmlFor="bookType">
          Book Title:
        </label>
        <input 
          id="bookType"
          className="form-input"
          type="text" 
          value={bookType} 
          onChange={e => setBookType(e.target.value)} 
          placeholder="Enter title" 
          required 
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="bookType">
          Book Author:
        </label>
        <input 
          id="bookType"
          className="form-input"
          type="text" 
          value={author} 
          onChange={e => setAuthor(e.target.value)} 
          placeholder="Enter author" 
          required 
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="condition">
          Condition:
        </label>
        <select 
          id="condition"
          className="form-input"
          value={condition} 
          onChange={e => setCondition(e.target.value)} 
          required 
        >
          <option value="">Select condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="bad">Bad Condition</option>
          <option value="any">Any</option>

        </select>
      </div>

    <div className="form-group">
  <label className="form-label" htmlFor="minPrice">
    Minimum Price:
  </label>
  <input 
    id="minPrice"
    className="form-input"
    type="number" 
    step="0.01"
    value={minPrice} 
    onChange={e => {
      const value = parseFloat(e.target.value);
      if (value >= 0 && Number((value).toFixed(2)) === value) {
        setMinPrice(value);
      }
    }} 
    placeholder="Enter minimum price" 
    required 
  />
    </div>
    <div className="form-group">
    <label className="form-label" htmlFor="maxPrice">
        Maximum Price:
    </label>
    <input 
        id="maxPrice"
        className="form-input"
        type="number" 
        step="0.01"
        value={maxPrice} 
        onChange={e => {
        const value = parseFloat(e.target.value);
        if (value >= 0 && Number((value).toFixed(2)) === value) {
            setMaxPrice(value);
        }
        }} 
        placeholder="Enter maximum price" 
        required 
    />
    </div>
      
      <input className="bookrequest-button" type="submit" value="Post Request" />
      <p style={{ margin: '20px' }}>Go back to <Link to="/" className="form-link">Home</Link></p>
    </MDBCard>
    
  );
}

export default BookRequest;