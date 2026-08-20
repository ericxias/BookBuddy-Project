//provide global data and functions to all components
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signOut, updateEmail, updatePassword, sendPasswordResetEmail } from '../frontend_app'; // Assuming you have a firebase.js file that exports your auth object and functions
import React, { useState, useEffect, createContext, useContext } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

///this communicate with firebase

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const currUser = auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
        });
    
        return currUser;
    }, []);


    //create account
    function register(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    
    }
    //signIn
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }   

    //logout
    function logout(){
        return signOut(auth);
    }

    //updating Email
    function updateUserEmail(email){
        return updateEmail(user, email);
    }

    //update password
    function updateUserPassword(password){
        return updatePassword(user, password);
    }

    //forget password
    function forgotPassword(email){
        return sendPasswordResetEmail(auth, email);
    }


    return (
        <AuthContext.Provider value={{user, login, logout, updateUserEmail, updateUserPassword, register,forgotPassword}}>
            {children}
        </AuthContext.Provider>
    )
}