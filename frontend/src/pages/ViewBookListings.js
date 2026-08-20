import './general.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js
import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit'; // Import MDB React UI Kit
import { Link, useNavigate } from 'react-router-dom';

const ViewBookListings = () => {
    const [listings, setListings] = useState([]);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        fetch('http://localhost:5000/getAllBookListings')
            .then(response => response.json())
            .then(data => {
                setListings(data);
                console.log(listings);
            });
    }, []);
    // Function to handle button click for book filtering
    const handleFilterButtonClick1 = () => {
        // Navigate to the BookFilter component
        navigate('/book-filter');
    };

    const {user, logout} = useAuth(); //GET LOGGED USER INFORMATION!!

const handleRequest = async (bookTitle, renterEmail, id) => {
    //should check if the inputted book exists in database in backend
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


    const handleFilterButtonClick2 = () => {
        // Navigate to the CourseFilter component
        navigate('/course-filter');
    };

    return (

        <div>
            <h1 className="title">View Book Listings</h1>
            <MDBBtn onClick={handleFilterButtonClick1} className="cell">Filter Books</MDBBtn>
            <MDBBtn onClick={handleFilterButtonClick2} className="cell" style={{ marginLeft: '10px' }}>Filter Courses</MDBBtn>
            <table>
                <thead>
                    <tr>
                        <th className="cell">BOOK TITLE</th>
                        <th className="cell">LISTING TYPE</th>
                        <th className="cell"> ID</th>
                        <th className="cell">PRICE</th>
                        <th className="cell">AUTHOR</th>
                        <th className="cell">TYPE</th>
                        <th className="cell">DURATION</th>
                        <th className="cell">CONDITION</th>
                        <th className="cell">USER</th>
                        <th className="cell">AVAILABILITY</th>
                        <th className="cell">REQUEST</th>


                    </tr>
                </thead>
                <tbody>
                    {listings.map((listing, index) => (
                        <tr key={index}>
                            <td className="cell">{listing.bookTitle}</td>
                            <td className="cell">{listing.listingType}</td>
                            <td className="cell">{listing.id}</td>
                            <td className="cell">{listing.price}</td>
                            <td className="cell">{listing.bookAuthor}</td>
                            <td className="cell">{listing.bookType}</td>
                            <td className="cell">{listing.rentalDuration}</td>
                            <td className="cell">{listing.bookCondition}</td>
                            <td className="cell">{listing.user}</td>
                            <td className="cell">{listing.availability}</td>
                            <td><button type ="submit" onClick={() => handleRequest(listing.bookTitle, listing.user, listing.id)} className="cell-button">Create Request</button></td> 
                        </tr>
                    ))}
                </tbody>
            </table>

            <div> <p>Go back to <Link to="/homepage" className="form-link">Homepage</Link></p> </div>
        </div>
    );


}



export default ViewBookListings;
