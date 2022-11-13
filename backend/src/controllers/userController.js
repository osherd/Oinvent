const asyncHandler = require( 'express-async-handler' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const crypto = require( 'crypto' );

const User = require( '../models/userModel' );
const Token = require( '../models/tokenModel' );
const sendEmail = require( '../utils/sendEmail' );

const generateToken = ( id ) => {
  return jwt.sign( { id }, process.env.JWT_SECRET, { expiresIn: "1d" } );

};

// Register User
const registerUser = asyncHandler( async ( req, res ) => {
  const { name, email, password } = req.body;

  // Validation
  if ( !name || !email || !password ) {
    res.status( 400 );
    throw new Error( "Please fill in all required fields" );
  }

  if ( password.length < 6 ) {
    res.send( 400 );
    throw new Error( 'Password must be up to 6 characters' );
  }

  // check if the user email already exists
  const userExists = await User.findOne( { email } );
  if ( userExists ) {
    res.send( 400 );
    throw new Error( 'The user already exists' );
  }
  // create new user
  const user = await User.create( {
    name,
    email,
    password
  } );


  //Generate  Token
  const token = generateToken( user._id );
  // Send HTTP-only Cookie to client
  res.cookie( "token", token, {
    path: '/',
    httpOnly: true,
    expires: new Date( Date.now() + 1000 * 86400 ), // 1 day
    sameSite: "none",
    secure: true
  } );

  if ( user ) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status( 201 ).json( {
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token
    } );
  } else {
    res.status( 400 );
    throw new Error( 'Invalid user data' );
  }
} );


// Login User
const loginUser = asyncHandler( async ( req, res ) => {


  // const body = req.body;
  const { email, password } = req.body;
  // Validate Request  
  if ( !email || !password ) {
    res.status( 400 );
    throw new Error( 'Please send email and password' );
  }


  // check if user exist in DB
  const user = await User.findOne( { email: email } );
  if ( !user ) {
    res.status( 400 );
    throw new Error( 'User not found please sign up' );
  }

  // check user password with hashed password stored in the database
  const validPassword = await bcrypt.compare( password, user.password );

  //Generate  Token
  const token = generateToken( user._id );
  // Send HTTP-only Cookie to client
  res.cookie( "token", token, {
    path: '/',
    httpOnly: true,
    expires: new Date( Date.now() + 1000 * 86400 ), // 1 day
    sameSite: "none",
    secure: true
  } );

  if ( validPassword ) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status( 200 ).json( {
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token
    } );
  } else {
    res.status( 4000 );
    throw new Error( 'Wrong Password or password Please insert the correct one' );
  }
} );

// User LogOut
const userLogout = asyncHandler( async ( req, res ) => {
  res.cookie( "token", "", {
    path: '/',
    httpOnly: true,
    expires: new Date( 0 ),
    sameSite: "none",
    secure: true
  } );
  return res.status( 200 ).json( { massage: 'Successfully Logged Out' } );
} );

// Get User Data
const getUserData = asyncHandler( async ( req, res ) => {

  const user = await User.findById( req.user._id );
  if ( user ) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status( 200 ).json( {
      _id,
      name,
      email,
      photo,
      phone,
      bio
    } );
  } else {
    res.status( 400 );
    throw new Error( 'User Not Found' );
  }
}
);


// User Login Status
const loginStatus = asyncHandler( async ( req, res ) => {
  const token = req.cookies.token;
  if ( !token ) {
    return res.json( false );
  }
  // Verify token
  const verifiedToken = jwt.verify( token, process.env.JWT_SECRET );
  if ( verifiedToken ) {
    return res.json( true );
  }
  return res.json( false );
} );


//  Update User Profile
const updateUser = asyncHandler( async ( req, res ) => {
  const user = await User.findById( req.user._id );

  if ( user ) {
    const { name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status( 200 ).json( {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    } );
  } else {
    res.status( 404 );
    throw new Error( "User not found" );
  }
} );

const changePassword = asyncHandler( async ( req, res ) => {
  console.log( req.body );
  const { oldPassword, password } = req.body;

  const user = await User.findById( req.user._id );

  if ( !user ) {
    res.status( 404 );
    throw new Error( "User not found, Please signup" );
  }

  // Validate
  if ( !oldPassword || !password ) {
    res.status( 404 );
    throw new Error( "Please add oldpassword and new password" );
  }
  // Check if old password matches password in DB

  const isPasswordMatched = await bcrypt.compare( oldPassword, user.password );

  // Save new Password
  if ( user && isPasswordMatched ) {
    user.password = password;
    await user.save().status( 200 ).send( 'Password change successful' );
  } else {
    res.status( 404 );
    throw new Error( "add oldpassword is incorect" );
  }


} );

const forgotPassword = asyncHandler( async ( req, res ) => {
  const { email } = req.body;

  const user = await User.findOne( { email } );
  if ( !user ) {
    res.status( 404 );
    throw new Error( 'User does not exist' );
  }

  // Delete token if it exist in DB

  let tokenTodelete = await Token.findOne( { userId: user._id } );
  if ( tokenTodelete ) {
    await tokenTodelete.deleteOne();
  }

  // Create reset token 
  const restToken = crypto.randomBytes( 32 ).toString( 'hex' ) + user._id;


  // Hash token before saving on DB
  const hashedToken = crypto.createHash( 'sha256' ).update( restToken ).digest( 'hex' );

  // Save token to Db
  await new Token( {
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * ( 60 * 1000 ) // 30 minutes
  } ).save();

  // Build reset Url
  const resetUrl = `${ process.env.FRONTEND_URL }/${ restToken }`;


  // Reset email content
  const message = `
  <h2>${ user.name }</h2>
  <p> Please use the url below to reset your password</p>
  <p> This reset link is valid for only 30 minutes</p>
  <a href = ${ resetUrl } clicktracking=off>${ resetUrl }</a>
  <p>Regards</p>
  <p>Oinvent Team</p>
  `;



  const subject = 'Password Reset request';
  const messageContent = message;
  const sendFrom = 'momentop2021@gmail.com'; //process.env.EMAIL_USER
  const sendTo = user.email;


  try {
    await sendEmail( subject, messageContent, sendFrom, sendTo );
    res.status( 200 ).json( {
      success: true,
      message: 'Reset Email Sent'
    } );

  } catch ( error ) {
    res.status( 500 );
    throw new Error( 'Email not sent , please try again' );
  }


} );

const resetPassword = asyncHandler( async ( req, res ) => {

  const { password } = req.body;
  const { restToken } = req.params;

  // Hash token , then compare to token in Db
  const hashedToken = crypto.createHash( 'sha256' ).update( restToken ).digest( 'hex' );
  // search token in DB
  const userToken = await Token.findOne( { token: hashedToken, expiresAt: { $gt: Date.now() } } );
  if ( !userToken ) {
    res.status( 404 );
    throw new Error( 'Invalid or Expired Token' );
  }

  //Find User
  const user = await User.findOne( { _id: userToken.userId } );
  user.password = password;
  await user.save();
  res.status( 200 ).json( {
    message: 'Password Reset Successful, Please Login'
  } );


} );

module.exports = {
  registerUser,
  loginUser,
  userLogout,
  getUserData,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword
};

