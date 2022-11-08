import mongoose from 'mongoose';
const PORT = process.env.DEV_PORT || 4000;
let MONGO_URL = process.env.MONGODB_URL;
import app from './index';
const start = async () =>
{
  try
  {
    await mongoose.connect( MONGO_URL );
    console.log( 'Connected to mongoDB' );
  } catch ( error )
  {
    console.error( error );
  }
  app.listen( PORT, () =>
  {
    console.log( `Server running on port ${ PORT }` );
  }
  );
};
start();