import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js
import { useNavigate } from 'react-router-dom'; 

function PrivateRoute({children}) {   
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
          navigate('/login');
        }
    }, [user, navigate]);
    
    return user ? children : null;
}

export default PrivateRoute;