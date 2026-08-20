import React, { useState } from 'react';
import {MDBContainer, MDBCard, MDBCardTitle, MDBCardBody, MDBCardFooter, MDBBtn} from 'mdb-react-ui-kit'; // Import MDB React UI Kit
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../images/Bb_Logo.png'; // Import the image
import './general.css'; 

// THIS IS WHERE BUTTONS FOR LOGGED IN USER ONLY TO ACCESS!

const Dashboard = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleBookRequest = () => {
      navigate('/book-request');
    }
    const handleCreateRequest = () => {
      navigate('/create-request');
    }
    const handleViewMyRequests = () => {
      navigate('/view-my-requests');
    }
    const handleViewOtherUsersRequests = () => {
      navigate('/view-other-users-requests');
    }
    const handleListItem = () => {
      navigate('/create-book-listing');
    }
    const handleViewListings = () => {
      navigate('/view-book-listings');
    }
    const handleMessages = () => {
      navigate('/report-user'); //temporary
    }
    const handleOrder = () => {
      navigate('/report-user'); //temporary
    }
    const handleRemoveListing = () => {
      navigate('/remove-book-listing'); // This will navigate to the RemoveBookListing component
    }


    return (
        <MDBContainer className='mt-5 d-flex align-items-center justify-content-center'>


          <MDBCard style={{ width: '1200px', maxWidth: '82rem' }}>
          <div className="accountNavBar" >
            
            <button onClick={handleCreateRequest}  className="buttonLeftMostSide">
              REQUEST
            </button>
            <button onClick={handleViewMyRequests}  className="buttonMiddle">
              VIEW REQUEST
            </button>
            <button onClick={handleViewOtherUsersRequests}  className="buttonMiddle">
              VIEW REQUESTS TO ME
            </button>
            <button onClick={handleListItem} className="buttonMiddle">
              LIST ITEM
            </button>
            <button onClick={handleViewListings} className="buttonMiddle">
              VIEW ALL LISTINGS
            </button>
            <button onClick={handleListItem} className="buttonMiddle">
              ORDER
            </button>
            <button onClick={handleMessages} className="buttonMiddle">
              MESSAGES
            </button>
            <button onClick={handleRemoveListing} className="buttonRightMostSide">
              REMOVE LISTING
            </button>
            </div>
              <MDBCardTitle className= 'mt-2 text-center'> <strong style={{
                  fontWeight: "400",
                  color:"#000",
                  marginBottom:"10px"
              }}>
                User Profile 
                </strong>
                </MDBCardTitle>

              <MDBCardBody> 
                <div style= {{flexDirection: 'column'}} className = 'd-flex align-items-center justify-content-center'>
                    <img className='rounded-circle shadow' width={150} src = {logo} alt = 'profile-img' />
                    <span className="userInfo">
                        {
                            String(user?.email)
                        
                        }
                    </span>
                    <MDBBtn onClick={() => logout()} className='mt-3'>
                        Logout
                    </MDBBtn>
                </div>
              </MDBCardBody>
    
    
    
            <MDBCardFooter>
            <div className='d-flex align-items-center justify-content-center'>
              <span className='me-2'>Update Changes? </span>
              <Link to="/update-profile"> <span> Update profile </span></Link>
              </div>
            </MDBCardFooter>
          </MDBCard>
        </MDBContainer>
        

    )
}

export default Dashboard