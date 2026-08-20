import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import {MDBContainer} from 'mdb-react-ui-kit'; // Import MDB React UI Kit

import Login from './pages/LogIn';
import ReportUser from './pages/ReportUser';
import CreateAccount from './pages/CreateAccount';
import CreateBookListing from './pages/CreateBooking';
import './App.css';
import NotFound from './pages/NotFound';
import SignOut from './pages/signout';
import BookRequest from './pages/BookRequest';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRoute from './pages/PrivateRoute';
import UpdateProfile from './pages/UpdateProfile';
import HomePage from './pages/homepage';
import CreateRequest from './pages/CreateRequest';
import ViewBookListings from './pages/ViewBookListings';
import ViewMyRequests from './pages/ViewMyRequests';
import ViewOtherUsersRequests from './pages/ViewOtherUsersRequests';
import BookFilter from './pages/BookFilter';
import CourseFilter from './pages/CourseFilter';
import RemoveBookListing from './pages/RemoveBookListing';

function App() {
  const [data, setData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <MDBContainer>
        <Router> 
        <div className="App">
        <h1><img src={require('./images/Bb_Logo.png')} alt="BookBuddy Logo" className="App-logo" /> BookBuddy</h1>
        <nav className="navbar">
            <Link to="/report-user" className="specialButton">Report User</Link>
            <Link to="/homepage" className="normalButton">Homepage</Link>
        <Link to="/" className="normalButton">Account</Link>
      </nav>
          <AuthProvider className='d-flex align-items-center justify-content-center'>  
            <Routes>
              <Route path="/" element={<PrivateRoute> 
                             <Dashboard />
              </PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute> 
                             <UpdateProfile />
              </PrivateRoute>} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-request" element={<PrivateRoute> 
                             <CreateRequest />
              </PrivateRoute>} />
              <Route path="/view-my-requests" element={<PrivateRoute> 
                             <ViewMyRequests />
              </PrivateRoute>} />
              <Route path="/view-other-users-requests" element={<PrivateRoute> 
                             <ViewOtherUsersRequests />
              </PrivateRoute>} />

              <Route path="/signout" element={<PrivateRoute> 
                             <SignOut />
              </PrivateRoute>} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/create-book-listing" element={<PrivateRoute> 
                             <CreateBookListing />
              </PrivateRoute>} />
              <Route path="/report-user" element={<ReportUser />} />
              <Route path="/book-request" element={<PrivateRoute> 
                             <BookRequest />
              </PrivateRoute>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/view-book-listings" element={<PrivateRoute> 
                             <ViewBookListings />
              </PrivateRoute>} />
              <Route path="/book-filter" element={<PrivateRoute> 
                             <BookFilter />
              </PrivateRoute>} />
              <Route path="/course-filter" element = {<PrivateRoute> 
                             <CourseFilter />
              </PrivateRoute>} />
              <Route path="/remove-book-listing" element={<PrivateRoute> 
                             <RemoveBookListing />
              </PrivateRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
  
      </AuthProvider>
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
      </div>
      </Router>
    </MDBContainer>

  );
}

const Root = () => {
  return (
    <div>
      <div className="App-header">
        <h1>Welcome to BookBuddy</h1>
        <p>Find the textbooks you need and rent the ones you no longer use!</p>
        <div className="cta-buttons">
          <Link to="/search" className="button">Search Books</Link>
          <Link to="/sell" className="specialButton">Rent Textbooks</Link>
        </div>
      </div>
      <div className="App-body">
        <h2>How it Works</h2>
        <p>BookBuddy is a platform for anyone to rent and lend textbooks. You can search for the books you need and rent them from other students. If you have textbooks that you no longer use, you can list them on BookBuddy and earn money by renting them to other users.</p>
        <h2>Why BookBuddy?</h2>
        <p>BookBuddy offers an affordable and sustainable way for users to access textbooks. By renting and selling textbooks, we can save money and reduce waste. BookBuddy also provides a convenient platform for book enthusiasts to connect and help each other out.</p>
        <Outlet />
      </div>
    </div>
  );
  }  

export default App;
