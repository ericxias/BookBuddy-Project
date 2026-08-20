import './general.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewOtherUsersRequests = () => {
    const [requests, setRequests] = useState([]);
    const {user} = useAuth(); 

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch('http://localhost:5000/viewOtherUsersRequests/user/'+user?.email, {
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

    async function handleAcceptRequest(bookTitle, bookId, requestId){
        console.log('handleRemoveRequest called');
      
        try {
          const response = await fetch('http://localhost:5000/accept_rental_request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "book_title": bookTitle,
                "owner_ref": bookId,
                "request_id": requestId,
            }),
          });
          console.log(response)
          if (response.ok) {
            // Handle successful booking creation
            alert('Accepted successfully');
            // navigate('/view-my-requests')
          } else {
            // Handle booking creation failure
            alert('Accepted failed');
      
            const responseBody = await response.json();
            console.log(responseBody)
            console.error('Accepted failed with status:', response.status, 'and body:', responseBody);
            alert('Accepted failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      async function handleRejectRequest(requestId, bookId){
        console.log('handleRemoveRequest called');
      
        try {
          const response = await fetch('http://localhost:5000/reject_rental_request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "book_title": requestId,
                "owner_ref": bookId,
            }),
          });
          console.log(response)
          if (response.ok) {
            // Handle successful booking creation
            alert('Rejected successfully');
            // navigate('/view-my-requests')
          } else {
            // Handle booking creation failure
            alert('Rejected failed');
      
            const responseBody = await response.json();
            console.log(responseBody)
            console.error('Rejected failed with status:', response.status, 'and body:', responseBody);
            alert('Rejected failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };


    return (
        <div>
            <h1 className="title">View Requests for My Books</h1>
            <table>
                <thead>
                    <tr>
                        <th className="cell">BOOK TITLE</th>
                        <th className="cell">ID</th>
                        <th className="cell">REQUESTER</th>
                        <th className="cell">ACCEPT REQUEST</th>
                        <th className="cell">REJECT REQUEST</th>
                        <th className="cell">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={index}>
                            <td className="cell">{request.bookTitle}</td>
                            <td className="cell">{request.requestId}</td>
                            <td className="cell">{request.requester.email}</td>
                            <td className="cell"><button type="submit" onClick={() => handleAcceptRequest(request.bookTitle, request.id, request.requestId)} className="cell-button">Accept Request</button></td> 
                            <td className="cell"><button type="submit" onClick={() => handleRejectRequest(request.requestId, request.id)} className="cell-button-2">Reject Request</button></td> 
                            <td className="cell">{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div> <p>Go back to <Link to="/" className="form-link">Account</Link></p> </div>
        </div>
    );

}

export default ViewOtherUsersRequests;