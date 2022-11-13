const express = require( "express" );
const { registerUser, loginUser, userLogout, getUserData, loginStatus, updateUser, changePassword, forgotPassword, resetPassword } = require( '../controllers/userController' );
const protect = require( '../middleWare/authMidlleWare' );
const router = express.Router();
router.post( "/register", registerUser );
router.post( "/login", loginUser );
router.get( "/logout", userLogout );
router.get( "/userData", protect, getUserData );
router.get( "/loggedin", loginStatus );
// router.patch( "/updateUser", protect, updateUser );
router.patch( "/updateUser", protect, updateUser );

// router.patch( "/changePassword", protect, changePassword );
router.patch( "/changepassword", changePassword );
router.post( "/forgotpassword", forgotPassword );
router.post( "/resetpassword/:resetToken", resetPassword );



module.exports = router;