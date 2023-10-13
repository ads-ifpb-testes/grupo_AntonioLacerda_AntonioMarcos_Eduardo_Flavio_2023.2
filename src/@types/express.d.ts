import { UserDTO } from '../dtos/UserDTO';

declare global {
  namespace Express {
    export interface Request {
      user?: Partial<UserDTO>;
    }
  }
}
