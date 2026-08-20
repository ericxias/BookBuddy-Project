import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {MDBContainer,MDBTypography, MDBCard, MDBCardTitle, MDBCardBody, MDBCardFooter, MDBInput, MDBBtn, MDBTypo} from 'mdb-react-ui-kit'; // Import MDB React UI Kit
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js


const ForgotPassword = () => {
    const [email, setEmail] = useState(''); // Set email state
    const [res, setRes] = useState();

    const {forgotPassword} = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setRes();
        await forgotPassword(email).then((res) => {
            setRes('Check inbox for further instructions');
        }).catch((err) => {
            setRes(err.message);
        })

    }

    return (

    <MDBContainer className='mt-5 d-flex align-items-center justify-content-center'>
      <MDBCard style={{ width: '600px', maxWidth: '22rem' }}>
          <MDBCardTitle className= 'mt-2 text-center'> <strong style={{
              fontWeight: "400",
              color:"#000",
              marginBottom:"10px"
          }}>
            Forgot Password
            </strong>
            </MDBCardTitle>
            {
              res && <MDBTypography className='ms-4 me-4' note noteColor='dark' style={ {color: 'white'}}>
                {res}
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

              <div className='mt-2 d-flex align-items-center justify-content-end'>
                  <MDBBtn type='submit' style={{fontWeight: 600}} color='primary'>
                    Reset
                  </MDBBtn>
              </div>
            </form>
          </MDBCardBody>



        <MDBCardFooter>
        <div className='d-flex align-items-center justify-content-center'>
          <span className='me-2'> Back To Profile? </span>
          <Link to="/"> Here </Link>
          </div>
        </MDBCardFooter>
      </MDBCard>
    </MDBContainer>

    )
}
export default ForgotPassword;