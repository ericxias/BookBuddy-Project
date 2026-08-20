// SignOut.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform sign out logic here...
    signOutUser(); // Call the function to sign out the user
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const signOutUser = () => {
    //not sure if it works
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Return null since this component only performs side effects
  return null;
}

export default SignOut;
