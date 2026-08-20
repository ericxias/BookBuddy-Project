import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css'; // Import additional CSS file for login page styling
import {MDBContainer, MDBCard, MDBTypography, MDBCardTitle, MDBCardBody, MDBCardFooter, MDBInput, MDBBtn, MDBTypo} from 'mdb-react-ui-kit'; // Import MDB React UI Kit
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js


//after loggin we will need a private route to protect the pages
// the private route will check if the user is logged in or not
// if the user is logged in, it will allow the user to access the page

export const Login = () => {
  const [email, setEmail] = useState(''); // Set email state
  const [password, setPassword] = useState(''); // Set password state
  const [error, setError] = useState()
  const navigate = useNavigate();

  const {login} = useAuth()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError();
    await login(email, password).then(res => {
      navigate('/homepage')
    }).catch((err) => {
      setError(err.toString())
    });
  }
  return (
    <MDBContainer className='mt-5 d-flex align-items-center justify-content-center'>
      <MDBCard style={{ width: '600px', maxWidth: '22rem' }}>
          <MDBCardTitle className= 'mt-2 text-center'> <strong style={{
              fontWeight: "400",
              color:"#000",
              marginBottom:"10px"
          }}>
            Login 
            </strong>
            </MDBCardTitle>{
              error && <MDBTypography className='ms-4 me-4' note noteColor='danger'>
                <strong>Error: </strong>{error}
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

              <div className='mt-2 d-flex align-items-center justify-content-end'>
                <Link className='me-2' to="/forgot-password">
                  Forgot Password?
                  </Link>
                  <MDBBtn type='submit' style={{fontWeight: 600}} color='primary'>
                    Login
                  </MDBBtn>

              </div>
            </form>


          </MDBCardBody>



        <MDBCardFooter>
        <div className='d-flex align-items-center justify-content-center'>
          <span className='me-2'>New here? </span>
          <Link to="/create-account">Create an account now!</Link>
          </div>
        </MDBCardFooter>
      </MDBCard>
    </MDBContainer>
  )}

export default Login;
