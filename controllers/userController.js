import Logger from '../utils/logger'; // Registration file userController
import * as UserModel from '../models/UserModel'; // import * as UserModel to import everything from file or {save} to import only one expression from file

const logger = Logger('userController');

const register = async (req, res, next) => {
  logger.log('debug', `register: ${JSON.stringify(req.body)}`); // req.body data that user send to us
  await UserModel.save({
    username: req.body.username,
    email: req.body.email,
    reHashedPassword: req.body.hashedPassword,
  }) //.catch(err => {
   // throw new Error('DB ERROR!!'); // change error text that are shown to clieent
}); // not required using {save}
 // .catch(err => next(err));
  res.status(200).send({ payload: { message: 'Succesfully registred!' } });
};

export { register };
