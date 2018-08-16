import jwt from 'jsonwebtoken';
import Logger from '../utils/logger'; // Registration file userController
import * as UserModel from '../models/UserModel'; // import * as UserModel to import everything from file or {save} to import only one expression from file
import AppError from '../errors/AppError';

const logger = Logger('userController');

const register = async (req, res, next) => {
  logger.log('debug', `register: ${JSON.stringify(req.body)}`); // req.body data that user send to us
  await UserModel.save({
    username: req.body.username,
    email: req.body.email,
    reHashedPassword: req.body.hashedPassword,
  }); // .catch(err => {
  // throw new Error('DB ERROR!!'); // change error text that are shown to clieent // not required using {save}
  // .catch(err => next(err));
  res.status(200).send({ payload: { message: 'Succesfully registred!' } });
};

const logIn = async (req, res) => {
  logger.log('debug', `register: ${JSON.stringify(req.body)}`); // req.body data that user send to us
  const user = await UserModel.getUserByEmail(req.body.email);
  if (user) {
    // Check password
    const isPasswordEqual = await UserModel.comparePasswords({
      userPassword: req.body.hashedPassword,
      reHashedPassword: user.reHashedPassword,
    });
    if (isPasswordEqual) {
      // generate token
      const token = jwt.sign(
        {
          data: { username: user.username },
        },
        process.env.JWT_SECRET,
        { expiresIn: '6h' },
      );
      logger.log('info', `Succesful logged in: ${user.username}`);
      res.status(200).send({ payload: { token } });
    }
  } else {
    throw new AppError('Wrong user credidntials!', 400);
  }
};

export { register, logIn };
