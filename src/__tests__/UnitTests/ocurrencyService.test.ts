import {
  describe,
  expect,
  it,
  beforeEach,
  beforeAll,
  afterAll,
  afterEach
} from '@jest/globals';
import { ICreateOcurrency, IOcurrency } from '../../dtos/OcurrencyDTO';
import { IUser, IUserWithoutPassword } from '../../dtos/UserDTO';
import {
  getPublicOccurrecies,
  getUserOccurrecies,
  createOcurrency,
  deleteOcurrency,
  updateOcurrency
} from '../../services/ocurrencyServices';
import { createUser, deleteUser } from '../../services/userServices';

const user = {
  name: 'teste',
  email: 'teste1@email.com',
  password: '123456'
};
let newUser: IUserWithoutPassword;

// beforeAll(async () => {
//   await deleteUser(user.email);
// });

describe('Ocurrency Services', () => {
  describe('getPublicOccurrecies', () => {
    it('should get all public ocurrency', async () => {
      const ocurrency = await getPublicOccurrecies();
      expect(ocurrency).toBeInstanceOf(Array);
    });
    it('should get all public ocurrency with userId', async () => {
      const ocurrencies = await getPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.userId).toBeDefined();
      });
    });
    it('should get all public ocurrency with title', async () => {
      const ocurrencies = await getPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.title).toBeDefined();
      });
    });
    it('should get all public ocurrency with public flag true', async () => {
      const ocurrencies = await getPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.public).toBe(true);
      });
    });
    it('should get all public ocurrency with timestamps', async () => {
      const ocurrencies = await getPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.createdAt).toBeDefined();
        expect(ocurrency.updatedAt).toBeDefined();
      });
    });
    it('should get all public ocurrency with location', async () => {
      const ocurrencies = await getPublicOccurrecies();
      ocurrencies.forEach((ocurrency: IOcurrency) => {
        expect(ocurrency.location).toBeDefined();
      });
    });
  });
  describe('getUserOccurrecies', () => {
    beforeEach(async () => {
      await deleteUser(user.email);
      newUser = (await createUser(user)).user;
    });
    it('should get all user ocurrency', async () => {
      const ocurrencies = await getUserOccurrecies(String(newUser._id));
      expect(ocurrencies).toBeInstanceOf(Array);
    });
    it('should get all user ocurrency with userId', async () => {
      const ocurrencies = await getUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: any) => {
        expect(ocurrency.userId).toBeDefined();
      });
    });
    it('should get all user ocurrency with title', async () => {
      const ocurrencies = await getUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: any) => {
        expect(ocurrency.title).toBeDefined();
      });
    });
    it('should get all user ocurrency with public flag true or false', async () => {
      const ocurrencies = await getUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: any) => {
        expect(ocurrency.public).toBeDefined();
      });
    });
    it('should get all user ocurrency with timestamps', async () => {
      const ocurrencies = await getUserOccurrecies(String(newUser._id));
      ocurrencies.forEach((ocurrency: any) => {
        expect(ocurrency.createdAt).toBeDefined();
        expect(ocurrency.updatedAt).toBeDefined();
      });
    });
    it('should get all user ocurrency with location', async () => {
      const ocurrencies = await getUserOccurrecies(String(newUser._id));
      console.log(ocurrencies);

      ocurrencies.forEach((ocurrency: any) => {
        expect(ocurrency.location).toBeDefined();
      });
    });
    it('should throw an error if userId is not provided', async () => {
      await expect(getUserOccurrecies('')).rejects.toThrowError();
    });
    it('should throw an error if user is not found', async () => {
      await expect(getUserOccurrecies('123')).rejects.toThrowError();
    });
  });
  describe('CreateOcurrency', () => {
    beforeEach(async () => {
      await deleteUser(user.email);
      newUser = (await createUser(user)).user;
    });
    it('should create a new ocurrency', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: String(newUser._id),
        title: 'test',
        type: 'Outro',
        date: new Date(),
        time: '00:00',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      expect(await createOcurrency(ocurrency)).toHaveProperty('_id');
    });
    it('should throw an error if userId is not provided', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: '',
        title: 'test',
        type: 'Outro',
        date: new Date(),
        time: '00:00',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      await expect(createOcurrency(ocurrency)).rejects.toThrowError();
    });
    it('should throw an error if userId is not found', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: '123',
        title: 'test',
        type: 'Outro',
        date: new Date(),
        time: '00:00',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      await expect(createOcurrency(ocurrency)).rejects.toThrowError();
    });
  });
  describe('UpdateOcurrency', () => {
    beforeEach(async () => {
      await deleteUser(user.email);
      newUser = (await createUser(user)).user;
    });
    it('should update a ocurrency', async () => {
      const ocurrency: ICreateOcurrency = {
        userId: String(newUser._id),
        title: 'test',
        type: 'Outro',
        date: new Date(),
        time: '00:00',
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        public: true
      };
      const createdOcurrency = await createOcurrency(ocurrency);
      const updatedOcurrency = await updateOcurrency(createdOcurrency._id, {
        title: 'test2'
      });
      expect(updatedOcurrency).toHaveProperty('_id');
      expect(updatedOcurrency.title).toBe('test2');
    });
    it('should throw an error if ocurrency id is not provided', async () => {
      await expect(updateOcurrency('', {})).rejects.toThrowError();
    });
    it('should throw an error if ocurrency is not found', async () => {
      await expect(updateOcurrency('123', {})).rejects.toThrowError();
    });
  });
  describe('DeleteOcurrency', () => {
    beforeEach(async () => {
      await deleteUser(user.email);
      newUser = (await createUser(user)).user;
    });
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
      const createdOcurrency = await createOcurrency(ocurrency);
      expect(await deleteOcurrency(createdOcurrency._id)).toBeUndefined();
    });
    it('should throw an error if ocurrency id is not provided', async () => {
      await expect(deleteOcurrency('')).rejects.toThrowError();
    });
    it('should throw an error if ocurrency is not found', async () => {
      await expect(deleteOcurrency('123')).rejects.toThrowError();
    });
  });
});

afterEach(async () => {
  await deleteUser(user.email);
});

afterAll(async () => {
  await deleteUser(user.email);
});
