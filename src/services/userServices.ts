import { User } from '../models/User';
import { UserDTO } from '../dtos/UserDTO';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from '../helpers/api-errors';
import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';

type TokenType = { email: string };

const hashPassword = async (password: string) => {
  return await hash(password, 10);
};

const generateToken = ({ email }: TokenType) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET || '', {
    expiresIn: '8h'
  });
  return token;
};

const findUser = async (email: string) => {
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (!user) {
    throw new BadRequestError('User Not Found');
  }
  const { password, ...userWithoutPassword } = user.dataValues;
  return userWithoutPassword;
};

const createUser = async (user: UserDTO) => {
  const userExists = await User.findOne({
    where: {
      email: user.email
    }
  });
  if (userExists) {
    throw new BadRequestError('User already exists');
  }
  const createdUser = await User.create({
    email: user.email,
    name: user.name,
    password: await hashPassword(user.password),
    birthDate: user.birthDate,
    country: user.country,
    city: user.city,
    adress: user.adress,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
  if (!createdUser) {
    throw new InternalServerError('Error creating user');
  }
  const { password, ...userWithoutPassword } = createdUser.dataValues;
  const token = generateToken({ email: user.email });
  return { user: { ...userWithoutPassword }, token };
};

const updateUser = async (email: string, userData: Partial<UserDTO>) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new BadRequestError('User already exists');
  }
  const updatedUser = await user.update(userData);
  if (!updatedUser) {
    throw new InternalServerError('Error updating user');
  }
  const { password, ...userWithoutPassword } = updatedUser.dataValues;

  return userWithoutPassword;
};

const deleteUser = async (email: string) => {
  const user = await User.destroy({ where: { email } });
  return;
};

export { findUser, createUser, updateUser, deleteUser, generateToken };
