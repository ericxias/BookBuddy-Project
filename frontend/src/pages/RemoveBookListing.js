import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function RemoveBookListing() {
  const [listingId, setListingId] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth(); // Get the user object from the AuthContext
  const navigate = useNavigate();

  const handleRemoveListing = async (e) => {
    e.preventDefault();

    // Check if user is not logged in and show an error if necessary
    if (!user) {
      setError('You must be logged in to remove a listing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/deleteBookListing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingID: listingId,
          user: user.email // Send the email of the logged-in user
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove the listing.');
      }

      alert('Listing removed successfully.');
      navigate('/'); // Navigate to the dashboard or home after successful removal
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Remove Book Listing</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRemoveListing}>
        <input
          type="text"
          placeholder="Enter Listing ID"
          value={listingId}
          onChange={(e) => setListingId(e.target.value)}
          required
        />
        <button type="submit">Remove Listing</button>
      </form>
    </div>
  );
}

export default RemoveBookListing;
