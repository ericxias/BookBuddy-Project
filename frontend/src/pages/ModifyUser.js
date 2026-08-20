import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ModifyUser.css';

const ModifyUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleModifyUser = async (e) => {
        e.preventDefault();

    

        try {
            const response = await fetch('http://localhost:5000/modify-user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username, "password": password, "email": email }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert(data.message);
            } else {
                alert('Failed to modify user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="modify-user-container">
            <h1 className="modify-user-header">Modify User</h1>
            <form onSubmit={handleModifyUser} className="modify-user-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="form-input"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="modify-user-button">Modify User</button>
            </form>
            <div className="modify-user-footer">
                <p className="modify-user-footer-text">Back to <Link to="/login" className="modify-user-link">Login</Link></p>
            </div>
        </div>
    );
}

export default ModifyUser;
