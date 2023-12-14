import { describe, it, expect } from '@jest/globals';

import {
  ApiError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
  ForbiddenError
} from '../../helpers/api-errors'; // Substitua pelo caminho correto

describe('ApiError Classes', () => {
  describe('ApiError', () => {
    it('should create an instance of ApiError with custom message and status code', () => {
      const customMessage = 'Custom Error Message';
      const statusCode = 418;

      const error = new ApiError(customMessage, statusCode);

      expect(error instanceof Error).toBeTruthy();
      expect(error.message).toBe(customMessage);
      expect(error.statusCode).toBe(statusCode);
    });
  });

  describe('BadRequestError', () => {
    it('should create an instance of BadRequestError with default message and status code 400', () => {
      const error = new BadRequestError();

      expect(error instanceof ApiError).toBeTruthy();
      expect(error.message).toBe('Bad Request');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('NotFoundError', () => {
    it('should create an instance of NotFoundError with default message and status code 404', () => {
      const error = new NotFoundError();

      expect(error instanceof ApiError).toBeTruthy();
      expect(error.message).toBe('Not Found');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('InternalServerError', () => {
    it('should create an instance of InternalServerError with default message and status code 500', () => {
      const error = new InternalServerError();

      expect(error instanceof ApiError).toBeTruthy();
      expect(error.message).toBe('Internal Server Error');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('UnauthorizedError', () => {
    it('should create an instance of UnauthorizedError with default message and status code 401', () => {
      const error = new UnauthorizedError();

      expect(error instanceof ApiError).toBeTruthy();
      expect(error.message).toBe('Unauthorized');
      expect(error.statusCode).toBe(401);
    });
  });

  describe('ForbiddenError', () => {
    it('should create an instance of ForbiddenError with default message and status code 403', () => {
      const error = new ForbiddenError();

      expect(error instanceof ApiError).toBeTruthy();
      expect(error.message).toBe('Forbidden');
      expect(error.statusCode).toBe(403);
    });
  });
});
