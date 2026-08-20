import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css'; // Import additional CSS file for login page styling
import {MDBContainer,MDBTypography, MDBCard, MDBCardTitle, MDBCardBody, MDBCardFooter, MDBInput, MDBBtn, MDBTypo} from 'mdb-react-ui-kit'; // Import MDB React UI Kit
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js



export const CreateAccount = () => {
  const [email, setEmail] = useState(''); // Set email state
  const [password, setPassword] = useState(''); // Set password state
  const [confPass, setConfPass] = useState(''); // Set confirm password state
  const [error, setError] = useState()
  const navigate= useNavigate();

  // authContext hook
  const {register} = useAuth();

  const handleSubmit = async(e) => {

    e.preventDefault();
    setError();
    if(password !== confPass){
      setError('Passwords do not match');
    } else{
      try{
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({"email": email, "password": password, "returnSecureToken": "true"}),
  });
  if(response.ok){
    navigate('/login')
  } 
  // else {
  //   setError(err.toString())
  // }
}
catch(err) {
  setError(err.toString())
}
}

  }


 
  return (
    <MDBContainer className='mt-5 d-flex align-items-center justify-content-center'>
      <MDBCard style={{ width: '600px', maxWidth: '22rem' }}>
          <MDBCardTitle className= 'mt-2 text-center'> <strong style={{
              fontWeight: "400",
              color:"#000",
              marginBottom:"10px"
          }}>
            Create Your Account 
            </strong>
            </MDBCardTitle>
            {
              error && <MDBTypography className='ms-4 me-4' note noteColor='danger'>
                <strong> Error:  </strong> {error}
              </MDBTypography>
            }
          <MDBCardBody> 
            <form onSubmit={handleSubmit}>
              <MDBInput value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        label='Enter your email' 
                        size='lg'
                        />   
              <MDBInput value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        label='Enter your password' 
                        size='lg'
                        required
                        className='mt-3'
                        />
              <MDBInput value={confPass}
                        onChange={(e) => setConfPass(e.target.value)}
                        type="password"
                        label='Re-enter your password' 
                        size='lg'
                        required
                        className='mt-3'
                        />
              <div className='mt-2 d-flex align-items-center justify-content-end'>
                  <MDBBtn type='submit' style={{fontWeight: 600}} color='primary'>
                    Register
                  </MDBBtn>
              </div>
            </form>
          </MDBCardBody>



        <MDBCardFooter>
        <div className='d-flex align-items-center justify-content-center'>
          <span className='me-2'>Already a member? </span>
          <Link to="/login">Log in now!</Link>
          </div>
        </MDBCardFooter>
      </MDBCard>
    </MDBContainer>
  )}

export default CreateAccount;
