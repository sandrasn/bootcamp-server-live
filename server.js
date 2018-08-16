import express from 'express';
import bodyParser from 'body-parser';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import session from 'express-session';
import './utils/dotenv';
import Logger from './utils/logger';
import index from './routes/index';
import user from './routes/user';
import media from './routes/media';
import defaultErrorHandler from './middlewares/defaultErrorHandler';
import authenticate from './middlewares/authenticate';

const logger = Logger('server.js');

const app = express();
const MongoStore = mongo(session);
mongoose.Promise = global.Promise; // How this libary works
mongoose.connect( process.env.MONGODB_URI, {useNewUrlParser: true} ); // Connection to database
mongoose.connection.on('error', () => {
  logger.log('error', 'Mongodb connection error. Please make sure MongoDB is running!');
  process.exit(); // Ends all process in case of error
});
mongoose.connection.once('open', () => {
  logger.log('info', 'MongoDB has been connected!');
});

app.use(bodyParser.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    }),
  }),
);

// end points definition
app.use(`/api/v${process.env.API_VERSION}`, index); // '/api/v1' required in main js file, do not use simple '', use ``
app.use(`/api/v${process.env.API_VERSION}`, user); // parvirza lietotaju uz registracijas formu
app.use(`/api/v${process.env.API_VERSION}`, media);

app.use(defaultErrorHandler); // used for all routes
const host = process.env.HOST_ADDRESS; // takes variables from .env file to globall process
const port = process.env.HOST_PORT;

app.listen(port, host, () => {
  console.log('ABC');
});
