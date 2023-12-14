import { describe, expect, it, beforeEach, afterAll } from '@jest/globals';
import {
  createUser,
  deleteUser,
  updateUser,
  findUser,
  generateToken
} from '../../services/userServices';
import { ICreateUser, IUser } from '../../dtos/UserDTO';
import { BadRequestError } from '../../helpers/api-errors';

const user: ICreateUser = {
  name: 'teste',
  email: 'teste@email.com',
  password: '123456'
};

beforeEach(async () => {
  await deleteUser(user.email);
});
describe('User Services', () => {
  describe('createUser', () => {
    it('should create a user', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'teste@email.com',
        password: '123456'
      };
      expect(await createUser(user)).toHaveProperty('user');
    });
    it('should not create a user with the same email', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'teste@email.com',
        password: '123456'
      };
      try {
        await createUser(user);
      } catch (error) {
        const castedError = error as BadRequestError;
        expect(error).toBeInstanceOf(BadRequestError);
        expect(castedError.message).toBe('User already exists');
      }
    });
  });
  describe('updateUser', () => {
    it('should update a user', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'teste@email.com',
        password: '123456'
      };
      await createUser(user);
      const updatedUser: Partial<ICreateUser> = {
        name: 'teste2'
      };
      expect(await updateUser(user.email, updatedUser)).toHaveProperty('_id');
    });
    it('should not update a user that not exists', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'tetse@email.com',
        password: '123456'
      };
      const updatedUser: Partial<ICreateUser> = {
        name: 'teste2'
      };
      try {
        await updateUser(user.email, updatedUser);
      } catch (error) {
        const castedError = error as BadRequestError;
        expect(error).toBeInstanceOf(BadRequestError);
        expect(castedError.message).toBe('User not exists');
      }
    });
  });
  describe('findUser', () => {
    it('should find a user', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'teste@email.com',
        password: '123456'
      };
      const { user: createdUser } = await createUser(user);
      expect(await findUser(user.email)).toHaveProperty('_id');
    });
    it('should not find a user that not exists', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'tetse@email.com',
        password: '123456'
      };
      try {
        await findUser(user.email);
      } catch (error) {
        const castedError = error as BadRequestError;
        expect(error).toBeInstanceOf(BadRequestError);
        expect(castedError.message).toBe('User Not Found');
      }
    });
  });
  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'teste@email.com',
        password: '123456'
      };
      const { user: createdUser } = await createUser(user);
      expect(await deleteUser(user.email)).toBeUndefined();
    });
    it('should not delete a user that not exists', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'tetse@email.com',
        password: '123456'
      };
      try {
        await deleteUser(user.email);
      } catch (error) {
        const castedError = error as BadRequestError;
        expect(error).toBeInstanceOf(BadRequestError);
        expect(castedError.message).toBe('User Not Found');
      }
    });
  });
  describe('generateToken', () => {
    it('should generate a token', async () => {
      const user: ICreateUser = {
        name: 'teste',
        email: 'teste@email.com',
        password: '123456'
      };
      const { user: createdUser } = await createUser(user);
      expect(generateToken({ email: user.email })).toBeDefined();
    });
  });
});
