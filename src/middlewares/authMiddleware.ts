import { NextFunction, Request, Response } from 'express';
import { NotFoundError, UnauthorizedError } from '../helpers/api-errors';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

type jwtDTO = { email: string };

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError('Não autorizado');
  }
  const [, token] = authorization.split(' ');
  const { email } = jwt.verify(token, process.env.JWT_SECRET || '') as jwtDTO;
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (!user) {
    throw new NotFoundError('User not Found');
  }
  const { password, ...userWithoutPassword } = user.dataValues;
  req.user = userWithoutPassword;
  next();
};
