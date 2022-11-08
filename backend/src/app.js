import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT | 4000;

const app = express();
app.use( cors() );
app.use( express.urlencoded( {
  extended: true
} ) );

app.listen( PORT, () =>
{
  console.log( `Server runing on port ${ PORT } ` );
} );

export { app };









