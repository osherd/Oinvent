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
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,//access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use( cors( corsOptions ) ); // Use this after the variable declaration

// Middlewares
app.use( express.json() );
app.use( cookieParser() );
app.use( express.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use(
  cors( {
    origin: [ "http://localhost:4000", " http://127.0.0.1:5173" ],
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
mongoose.connect( MONGO_URL ).then( () => {
  console.log( 'Connected to mongoDB' );
  app.listen( PORT, () => {
    console.log( `Server running on port ${ PORT }` );
  } );
} ).catch( ( err ) => {
  console.log( err );
} );
