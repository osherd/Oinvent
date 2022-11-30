import axios from 'axios';
import { toast } from 'react-toastify';
// export const BACKEND_URL = process.env.BACKEND_URL;
export const BACKEND_URL = 'http://localhost:4000/auth/users';



export const validateEmail = ( email ) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Login User
export const loginUser = async ( userData ) => {

  try {
    const response = await axios.post( `${ BACKEND_URL }/login`, userData );
    if ( response.statusText === 'OK' ) {
      toast.success( "Login Successful..." );
    }
    return response.data;
  } catch ( error ) {
    const message =
      ( error.response && error.response.data && error.response.data.message ) ||
      error.message ||
      error.toString();
    toast.error( message );
  }
};


//Register
export const registerUser = async ( userData ) => {
  try {
    const response = await axios.post( `${ BACKEND_URL }/register`, userData );
    if ( response.statusText === 'Ok' ) {
      toast.success( 'User Register Successful...' );
    }
    return response.data;

  } catch ( error ) {
    const message = ( error.response && error.response.data && error.response.data.message ) ||
      error.message || error.toString();
    toast.error( message );
  }
};

// Forgot Password
export const forgotPassword = async ( userData ) => {
  try {
    const response = await axios.put( `${ BACKEND_URL }/forgot`, userData );
    if ( response.statusText === 'OK' ) {
      toast.success( 'Forgot Password Successfull....' );
    }
    return response.data;
  } catch ( error ) {
    const message = ( error.response && error.response.data && error.response.data.message ) ||
      error.message && error.message.toString();
    toast.error( message );
  }
};

export const resetPassword = async ( userData, resetToken ) => {
  try {
    const response = await axios.post( `${ BACKEND_URL }/resetpassword/${ resetToken }`, userData );
    return response.data;
  } catch ( error ) {
    const message = ( error.response
      && error.response.data
      && error.response.data.message
    ) || error.message && error.message.toString();
    toast.error( message );
  }
};

export const logoutUser = async () => {
  try {
    await axios.get( `${ BACKEND_URL }/logout` );
    toast.success( 'Logged Out Successful...' );
  } catch ( error ) {

    const message = ( error.response
      && error.response.data
      && error.response.data.message ) ||
      error.message ||
      error.toString();
    toast.error( message );
  }

};