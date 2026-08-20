import React, { useState } from 'react';
import {MDBContainer, MDBCard, MDBCardTitle, MDBCardBody,MDBTypography, MDBCardFooter, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBInput, MDBInputGroup, MDBBtn} from 'mdb-react-ui-kit'; // Import MDB React UI Kit
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext.js
import logo from '../images/Bb_Logo.png'; // Import the image
import { Link } from 'react-router-dom'; 



const UpdateProfile = () => {
    const {user, updateUserEmail, updateUserPassword} = useAuth();
    const [fillActive, setFillActive] = useState('tab1');
    const [email, setEmail] = useState(''); // Set email state
    const [password, setPassword] = useState(''); // Set password state
    const [res, setRes] = useState('')

    const handleFillClick = (value) => {
        if (value === fillActive) {
            return;
        }else{
            setFillActive(value);
        }

    }

    const handleEmailSubmit = async(e) => {
        e.preventDefault();
        setRes()
        await updateUserEmail(email).then((res) => {
            setRes("Email updated successfully")
        
        }).catch((err) => {
            setRes(err.message)
        })
    }

    const handlePasswordSubmit = async(e) => {
        e.preventDefault();
        setRes()
        await updateUserPassword(password).then((res) =>
            setRes("Password updated successfully")
        ).catch((err) => {
            setRes(err.message)
        })
    }

    return (
        <MDBContainer className='mt-1 d-flex align-items-center justify-content-center'  style={{ width: '80vw', height: '80vh' }}>
          <MDBCard style={{ width: '900px' }}>
              <MDBCardTitle className= 'mt-2 text-center'> <strong style={{
                  fontWeight: "400",
                  color:"#000",
                  marginBottom:"10px"
              }}>
                Update Profile 
                </strong>
                </MDBCardTitle>{
                    res && <MDBTypography className='ms-4 me-4 text-white' note noteColor='dark'>
                        {res}
                    </MDBTypography>
                }

              <MDBCardBody> 
                <div style= {{flexDirection: 'column'}} className = 'd-flex align-items-center justify-content-center'>
                    <img className='mb-5 rounded-circle shadow' width={150} src = {logo} alt = 'profile-img' />
                    <span className='h3 mt-2'>
                        {
                            String(user?.email)
                        }
                    </span>
                </div>
                <MDBTabs fill className='mb-5'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
                            Email
                        </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
                            Password
                        </MDBTabsLink>
                    </MDBTabsItem>


                </MDBTabs>
                    {fillActive === 'tab1' && (
                        <div>
                            {/* Content for tab 1 */}
                            <form onSubmit={handleEmailSubmit}>
                                <MDBInputGroup>
                                    <input 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='form-control'
                                        placeholder='Enter your new email address'
                                    />
                                    <MDBBtn type='submit' outline>
                                        Update Email
                                    </MDBBtn>
                                </MDBInputGroup>
                            </form>
                        </div>
                    )}

                    {fillActive === 'tab2' && (
                        <div>
                            {/* Content for tab 2 */}
                            <form onSubmit={handlePasswordSubmit}>
                                <MDBInputGroup>
                                    <input 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='form-control'
                                        placeholder='Enter your new password'
                                    />
                                    <MDBBtn type='submit' outline>
                                        Update Password
                                    </MDBBtn>
                                </MDBInputGroup>
                            </form>
                        </div>
                    )}
            
              </MDBCardBody>
    
            
    
            <MDBCardFooter className= 'mt-5'>
            <div className='d-flex align-items-center justify-content-center'>
              <span className='me-2'>Back To Profile? </span>
              <Link to="/"> <span> Here! </span></Link>
              </div>
            </MDBCardFooter>
          </MDBCard>
        </MDBContainer>
        

    )
}
export default UpdateProfile