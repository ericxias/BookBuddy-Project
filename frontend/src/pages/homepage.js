import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js

function HomePage() {
  const {user, logout} = useAuth(); //GET LOGGED USER INFORMATION!!

  return (
    <React.Fragment>
      <div className="App-header">
        <h1>Welcome to BookBuddy</h1>
        <p>Find the textbooks you need and rent the ones you no longer use!</p>
        <div className="cta-buttons">
          <Link to="/view-book-listings" className="button">Search Books</Link>
          {user && <Link to="/create-book-listing" className="specialButton">Rent Textbooks</Link>}        </div>
      </div>
      <div className="App-body">
        <h2>How it Works</h2>
        <p>BookBuddy is a platform for anyone to rent and lend textbooks. You can search for the books you need and rent them from other students. If you have textbooks that you no longer use, you can list them on BookBuddy and earn money by renting them to other users.</p>
        <h2>Why BookBuddy?</h2>
        <p>BookBuddy offers an affordable and sustainable way for users to access textbooks. By renting and selling textbooks, we can save money and reduce waste. BookBuddy also provides a convenient platform for book enthusiasts to connect and help each other out.</p>
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default HomePage;