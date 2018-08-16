import jwt from 'jsonwebtoken';
import Logger from '../utils/logger'; // important order
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = Logger('Authenticate');

const jwtVerify = token =>
  new Promise(resolve => {
    jwt.verify(token, process.env.JWT_Secret, (error, decodedToken) => {
      resolve(decodedToken);
    });
  });

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization) {
    [, token] = authorization.split(' '); // returns array with last element in array. and assign to token variable.
  }
  if (token) {
    const decodedToken = await jwtVerify(token);

    if (decodedToken && decodedToken.data && decodedToken.data.username) {
      const { username } = decodedToken.data; // put username in token
      const user = await UserModel.getUserByName(username);
      if (user) {
        logger.log('debug', `User ${username} was authenticated`);
        req.user = user;
        next();
      }
    }
    return next(new AppError('Token is invalid!', 401));
  }
  return next(new AppError('No token provided', 401)); // Return is used to stop execution;
};

export default authenticate;
