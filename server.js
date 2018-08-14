import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import index from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use(`/api/v${process.env.API_VERSION}`, index); // '/api/v1' required in main js file, do not use simple '', use ``

const host = process.env.HOST_ADDRESS; // takes variables from .env file to globall process
const port = process.env.HOST_PORT;

app.listen(port, host, () => {
  console.log('ABC');
});
