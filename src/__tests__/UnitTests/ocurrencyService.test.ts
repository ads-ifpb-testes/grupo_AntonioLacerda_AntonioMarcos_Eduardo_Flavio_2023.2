import { describe, expect, it, beforeEach, beforeAll } from '@jest/globals';
import { ICreateOcurrency, IOcurrency } from '../../dtos/OcurrencyDTO';
import { IUser } from '../../dtos/UserDTO';
import {
  GetPublicOccurrecies,
  GetUserOccurrecies,
  CreateOcurrency,
  DeleteOcurrency,
  UpdateOcurrency
} from '../../services/ocurrencyServices';
import { User } from '../../models/User';
import { Schema } from 'mongoose';

const user = {
  name: 'teste',
  email: 'teste@email.com',
  password: '123456'
};
let newUser: IUser;
beforeAll(async () => {
  await User.deleteMany({
    email: /test/
  });
  newUser = await User.create(user);
});

describe('Ocurrency Services', () => {
  describe('GetPublicOccurrecies', () => {
    it('should get all public ocurrency', async () => {
      const ocurrency = await GetPublicOccurrecies();
      expect(ocurrency).toBeInstanceOf(Array);
    });
    it('should get all public ocurrency with userId', async () => {
      const ocurrencies = await GetPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.userId).toBeDefined();
      });
    });
    it('should get all public ocurrency with title', async () => {
      const ocurrencies = await GetPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.title).toBeDefined();
      });
    });
    it('should get all public ocurrency with public flag true', async () => {
      const ocurrencies = await GetPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.public).toBe(true);
      });
    });
    it('should get all public ocurrency with timestamps', async () => {
      const ocurrencies = await GetPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.createdAt).toBeDefined();
        expect(ocurrency.updatedAt).toBeDefined();
      });
    });
    it('should get all public ocurrency with location', async () => {
      const ocurrencies = await GetPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.location).toBeDefined();
      });
    });
  });
  describe('GetUserOccurrecies', () => {
    it('should get all user ocurrency', async () => {
      const ocurrencies = await GetUserOccurrecies(String(newUser._id));
      expect(ocurrencies).toBeInstanceOf(Array);
    });
    it('should get all user ocurrency with userId', async () => {
      const ocurrencies = await GetUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.userId).toBeDefined();
      });
    });
    it('should get all user ocurrency with title', async () => {
      const ocurrencies = await GetUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.title).toBeDefined();
      });
    });
    it('should get all user ocurrency with public flag true or false', async () => {
      const ocurrencies = await GetUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.public).toBeDefined();
      });
    });
    it('should get all user ocurrency with timestamps', async () => {
      const ocurrencies = await GetUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.createdAt).toBeDefined();
        expect(ocurrency.updatedAt).toBeDefined();
      });
    });
    it('should get all user ocurrency with location', async () => {
      const ocurrencies = await GetUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.location).toBeDefined();
      });
    });
    it('should throw an error if userId is not provided', async () => {
      await expect(GetUserOccurrecies('')).rejects.toThrowError();
    });
    it('should throw an error if user is not found', async () => {
      await expect(GetUserOccurrecies('123')).rejects.toThrowError();
    });
    it('should throw an error if user id is not provided', async () => {
      await expect(GetUserOccurrecies('')).rejects.toThrowError();
    });
  });
  describe('CreateOcurrency', () => {
    it('should create a new ocurrency', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: String(newUser._id),
        title: 'test',
        type: 'test',
        date: new Date(),
        time: 'test',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      expect(await CreateOcurrency(ocurrency)).toHaveProperty('_id');
    });
    it('should throw an error if userId is not provided', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: '',
        title: 'test',
        type: 'test',
        date: new Date(),
        time: 'test',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      await expect(CreateOcurrency(ocurrency)).rejects.toThrowError();
    });
    it('should throw an error if userId is not found', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: '123',
        title: 'test',
        type: 'test',
        date: new Date(),
        time: 'test',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      await expect(CreateOcurrency(ocurrency)).rejects.toThrowError();
    });
  });
  describe('UpdateOcurrency', () => {
    it('should update a ocurrency', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: String(newUser._id),
        title: 'test',
        type: 'test',
        date: new Date(),
        time: 'test',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      const createdOcurrency = await CreateOcurrency(ocurrency);
      const updatedOcurrency = await UpdateOcurrency(createdOcurrency._id, {
        title: 'test2'
      });
      expect(updatedOcurrency).toHaveProperty('_id');
      expect(updatedOcurrency.title).toBe('test2');
    });
    it('should throw an error if ocurrency id is not provided', async () => {
      await expect(UpdateOcurrency('', {})).rejects.toThrowError();
    });
    it('should throw an error if ocurrency is not found', async () => {
      await expect(UpdateOcurrency('123', {})).rejects.toThrowError();
    });
  });
  describe('DeleteOcurrency', () => {
    it('should delete a ocurrency', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: String(newUser._id),
        title: 'test',
        type: 'test',
        date: new Date(),
        time: 'test',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      const createdOcurrency = await CreateOcurrency(ocurrency);
      expect(await DeleteOcurrency(createdOcurrency._id)).toBeUndefined();
    });
    it('should throw an error if ocurrency id is not provided', async () => {
      await expect(DeleteOcurrency('')).rejects.toThrowError();
    });
    it('should throw an error if ocurrency is not found', async () => {
      await expect(DeleteOcurrency('123')).rejects.toThrowError();
    });
  });
});
