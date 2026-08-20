import './general.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// const handleRemoveRequest = async(requestId) =>{
async function handleRemoveRequest(requestId){
  console.log('handleRemoveRequest called');

  try {
    const response = await fetch('http://localhost:5000/removeRequest/id/'+requestId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {
      // Handle successful booking creation
      alert('Request removed successfully');
      // navigate('/view-my-requests')
    } else {
      // Handle booking creation failure
      alert('Removing request failed');

      const responseBody = await response.json();
      console.log(responseBody)
      console.error('Removing request failed with status:', response.status, 'and body:', responseBody);
      alert('Removing request failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const ViewMyRequests = () => {
    const [requests, setRequests] = useState([]);
    const {user} = useAuth(); 

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch('http://localhost:5000/viewMyRequests/user/'+user?.email, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setRequests(data);
                    
                }
              } catch (error) {
                console.error('Error:', error);
              }
        }
        getData();
    }, [user?.email]);

    

    return (
        <div>
            <h1 className="title">View My Requests</h1>
            <table>
                <thead>
                    <tr>
                        <th className="cell">BOOK TITLE</th>
                        <th className="cell">ID</th>
                        <th className="cell">BOOK OWNER</th>
                        <th className="cell">Remove Request</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={index}>
                            <td className="cell">{request.bookTitle}</td>
                            <td className="cell">{request.id}</td>
                            <td className="cell">{request.user}</td>
                            <td className="cell"><button type="submit" onClick={() => handleRemoveRequest(request.id)} className="cell-button">Remove Request</button></td> 
                        </tr>
                    ))}
                </tbody>
            </table>

            <div> <p>Go back to <Link to="/" className="form-link">Account</Link></p> </div>
        </div>
    );

}

export default ViewMyRequests;