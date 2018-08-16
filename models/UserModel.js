import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    reHashedPassword: { type: String, trim: true, required: true },
  },
  { timestamp: true },
);
userSchema.pre('save', async function callback(next) {
  if (this.reHashedPassword) {
    this.reHashedPassword = await bcrypt.hash(this.reHashedPassword, 10); // password encrypting using bcrypt
  }
  next();
});
const UserModel = mongoose.model('User', userSchema);

const save = async model => new UserModel(model).save(); // model is async function

const getUserByName = async username => UserModel.findOne({ username });
const getUserByEmail = async email => UserModel.findOne({ email });

const comparePasswords = async ({ userPassword, reHashedPassword }) =>
  bcrypt.compare(userPassword, reHashedPassword);

UserModel.schema
  .path('username')
  .validate(async username => !(await getUserByName(username)), 'Username already exists!');
UserModel.schema
  .path('email')
  .validate(async email => !(await getUserByEmail(email)), 'Email already taken!');

export { save, getUserByName, getUserByEmail, comparePasswords };
