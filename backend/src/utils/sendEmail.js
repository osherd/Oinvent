const nodemailer = require( 'nodemailer' );


//SendEmail function with outlook

const sendEmail = async ( subject, messageContent, sendTo, sendFrom ) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport( {
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  } );

  // Option for sending email
  const options = {
    from: sendFrom,
    to: sendTo,
    subject: subject,
    html: messageContent,
  };

  // send email
  transporter.sendMail( options, function ( err, info ) {
    if ( err ) {
      console.log( err );
    } else {
      console.log( info );
    }
  } );
};

module.exports = sendEmail;


//  SendEmail function with gmail

// const sendEmail = async ( subject, messageContent, sendFrom, sendTo ) => {


//   const body = {
//     from: sendFrom,
//     to: sendTo,
//     subject: subject,
//     html: messageContent
//   };


//   const transporter = nodemailer.createTransport( {
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'momentop2021@gmail.com', //process.env.EMAIL_USER,
//       pass: 'Mp1234567' //process.env.EMAIL_PASS
//     }
//   } );

//   // verify connection configuration
//   transporter.verify( function ( error, success ) {
//     if ( error ) {
//       console.log( error );
//     } else {
//       console.log( "Server is ready to take our messages " );
//     }
//   } );
//   transporter.sendMail( body, ( err, info ) => {
//     if ( err ) {
//       console.log( err );
//       return false;
//     }
//     console.log( info );
//     console.log( "email sent" );
//   } );

// };

// module.exports = sendEmail;



