import supertest from 'supertest';
import { describe, expect, it, beforeAll } from '@jest/globals';
import app from '../../app';
import jwt from 'jsonwebtoken';

beforeAll(() => {
  console.log('beforeAll');
});

describe('Login', () => {
  describe('login route', () => {
    it('should not login with incorrect email', async () => {
      const loginbody = {
        email: 'edua@email.com',
        password: '123456'
      };

      await supertest(app).post('/login').send(loginbody).expect(404);
    });

    it('should not login with incorrect password', async () => {
      const loginbody = {
        email: 'eduardo@email.com',
        password: '1234567'
      };

      await supertest(app).post('/login').send(loginbody).expect(401);
    });

    it('should login correctly with correct data', async () => {
      const loginbody = {
        email: 'eduardo@email.com',
        password: '123456'
      };

      await supertest(app).post('/login').send(loginbody).expect(200);
    });
  });
  describe('token validation', () => {
    it('should returns a token', async () => {
      const loginbody = {
        email: 'eduardo@email.com',
        password: '123456'
      };

      const response = await supertest(app).post('/login').send(loginbody);

      expect(response.body).toHaveProperty('token');
    });

    it('should validate token correctly', async () => {
      const loginbody = {
        email: 'eduardo@email.com',
        password: '123456'
      };

      const response = await supertest(app).post('/login').send(loginbody);

      const token = response.body.token;

      const isValid = jwt.verify(token, process.env.JWT_SECRET || '');

      expect(isValid).toBeTruthy();
    });

    it('should not validate token with incorrect secret', async () => {
      const loginbody = {
        email: 'eduardo@email.com',
        password: '123456'
      };

      const response = await supertest(app).post('/login').send(loginbody);

      const token = response.body.token;

      const isValid = jwt.verify(token, 'incorrect secret');

      expect(isValid).toBeFalsy();
    });
  });
});
