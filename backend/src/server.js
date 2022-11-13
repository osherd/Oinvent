const dotenv = require( "dotenv" );
const express = require( "express" );
const mongoose = require( "mongoose" );
const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const cookieParser = require( "cookie-parser" );
const path = require( "path" );
const userRoute = require( './routes/userRoute' );
const errorHandler = require( './middleWare/errorHandler' );

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// Middlewares
app.use( express.json() );
app.use( cookieParser() );
app.use( express.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use(
  cors( {
    origin: [ "http://localhost:4000" ],
    credentials: true,
  } )
);

// Error middleWare
app.use( errorHandler );

// Routes Middleware
app.use( "/auth/users", userRoute );

// Routes
app.get( "/", ( req, res ) => {
  res.send( "Home Page" );
} );

// connect to db and start server
mongoose.connect( 'mongodb+srv://momento:XY9w2q3LmwALJpUo@cluster0.lcu5v8n.mongodb.net/Oinvent-app?retryWrites=true&w=majority' ).then( () => {
  console.log( 'Connected to mongoDB' );
  app.listen( PORT, () => {
    console.log( `Server running on port ${ PORT }` );
  } );
} ).catch( ( err ) => {
  console.log( err );
} );
