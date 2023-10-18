import { Request, Response } from 'express';
import { User } from '../models/User';
import { NotFoundError, UnauthorizedError } from '../helpers/api-errors';
import bcrypt from 'bcrypt';
import { generateToken } from '../services/userServices';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (!user) {
    throw new NotFoundError('Usuário não encontrado');
  }
  const verifyPassword = await bcrypt.compare(
    password,
    user.getDataValue('password')
  );
  if (!verifyPassword) {
    throw new UnauthorizedError('Usuário ou senha incorretos');
  }
  const token = generateToken({ email });
  const { password: _, ...userWithoutPassword } = user.dataValues;

  return res.send({
    userWithoutPassword,
    token
  });
};

export { login };
