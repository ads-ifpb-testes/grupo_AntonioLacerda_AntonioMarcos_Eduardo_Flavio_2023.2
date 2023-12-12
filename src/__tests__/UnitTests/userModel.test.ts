import { describe, expect, it, beforeEach } from '@jest/globals';

import { User } from '../../models/User';

beforeEach(async () => {
  await User.deleteMany({
    email: /test/
  });
});

describe('User Model', () => {
  it('should create a valid user', async () => {
    const userData = {
      email: 'teste@email.com',
      name: 'teste',
      password: '123456'
    };

    const newUser = new User(userData);

    await expect(newUser.validate()).resolves.not.toThrow();
  });

  it('should not create a user without email', async () => {
    const userData = {
      name: 'teste',
      password: '123456'
    };

    const newUser = new User(userData);

    await expect(newUser.validate()).rejects.toThrow('email');
  });
  it('should not create a user without name', async () => {
    const userData = {
      email: 'teste@email.com',
      password: '123456'
    };
    const newUser = new User(userData);
    await expect(newUser.validate()).rejects.toThrow('name');
  });
  it('should not create a user without password', async () => {
    const userData = {
      email: 'teste@email.com',
      name: 'teste'
    };
    const newUser = new User(userData);
    await expect(newUser.validate()).rejects.toThrow('password');
  });
  it('should not create a user with a duplicate email', async () => {
    const userData = {
      email: 'teste@email.com',
      name: 'teste',
      password: '123456'
    };
    const newUser1 = new User(userData);
    const newUser2 = new User(userData);
    await newUser1.save();
    await expect(newUser2.save()).rejects.toThrow('email');
  });
  it('should create a user with a valid birthDate', async () => {
    const userData = {
      email: 'teste@email.com',
      name: 'teste',
      password: '123456',
      birthDate: '1990-01-01'
    };
    const newUser = new User(userData);
    await expect(newUser.validate()).resolves.not.toThrow();
  });

  it('should not create a user with an invalid birthDate', async () => {
    const userData = {
      email: 'teste@email.com',
      name: 'teste',
      password: '123456',
      birthDate: 'invalid-date'
    };
    const newUser = new User(userData);
    await expect(newUser.validate()).rejects.toThrow('birthDate');
  });
  it('should create a user with timestamps', async () => {
    const userData = {
      email: 'teste@email.com',
      name: 'teste',
      password: '123456'
    };
    const newUser = new User(userData);
    await newUser.save();
    expect(newUser.createdAt).toBeDefined();
    expect(newUser.updatedAt).toBeDefined();
  });
});
