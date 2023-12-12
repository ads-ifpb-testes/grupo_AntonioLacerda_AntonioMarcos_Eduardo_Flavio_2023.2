import { describe, expect, it, beforeEach, beforeAll } from '@jest/globals';

import { Ocurrency } from '../../models/Ocurrency';
import { User } from '../../models/User';

const user = {
  email: 'teste1@email.com',
  password: '123456',
  name: 'teste1'
};

let newUser: any;

beforeAll(async () => {
  await User.deleteMany({
    email: /test/
  });
  newUser = new User(user);
  await newUser.save();
});

beforeEach(async () => {
  await Ocurrency.deleteMany({
    title: /test/
  });
});

describe('Ocurrency Model', () => {
  it('should create a valid ocurrency', async () => {
    const ocurrencyData = {
      title: 'test',
      userId: newUser._id,
      type: 'test',
      date: new Date(),
      time: '00:00',
      public: true,
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    };

    const newOcurrency = new Ocurrency(ocurrencyData);

    await expect(newOcurrency.validate()).resolves.not.toThrow();
  });
  it('should not create a ocurrency without userId', async () => {
    const ocurrencyData = {
      title: 'test',
      type: 'test',
      date: new Date(),
      time: '00:00',
      public: true,
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    };

    const newOcurrency = new Ocurrency(ocurrencyData);

    await expect(newOcurrency.validate()).rejects.toThrow('userId');
  });
  it('should not create a ocurrency without date', async () => {
    const ocurrencyData = {
      title: 'test',
      userId: newUser._id,
      type: 'test',
      time: '00:00',
      public: true,
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    };

    const newOcurrency = new Ocurrency(ocurrencyData);

    await expect(newOcurrency.validate()).rejects.toThrow('date');
  });
  it('should not create a ocurrency without public flag', async () => {
    const ocurrencyData = {
      title: 'test',
      userId: newUser._id,
      type: 'test',
      time: '00:00',
      date: new Date(),
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    };

    const newOcurrency = new Ocurrency(ocurrencyData);

    await expect(newOcurrency.validate()).rejects.toThrow('public');
  });
  it('should not create a ocurrency without location', async () => {
    const ocurrencyData = {
      title: 'test',
      userId: newUser._id,
      type: 'test',
      time: '00:00',
      date: new Date(),
      public: true
    };

    const newOcurrency = new Ocurrency(ocurrencyData);

    await expect(newOcurrency.validate()).rejects.toThrow('location');
  });
  it('should not create a ocurrency with a invalid location', async () => {
    const ocurrencyData = {
      title: 'test',
      userId: newUser._id,
      type: 'test',
      time: '00:00',
      date: new Date(),
      public: true,
      location: {
        type: 'Point',
        coordinates: 'teste'
      }
    };

    const newOcurrency = new Ocurrency(ocurrencyData);

    await expect(newOcurrency.validate()).rejects.toThrow('location');
  });
  it('should have a getLatLng method', async () => {
    const ocurrencyData = {
      title: 'test',
      userId: newUser._id,
      type: 'test',
      time: '00:00',
      date: new Date(),
      public: true,
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    };

    const newOcurrency = new Ocurrency(ocurrencyData);

    await expect(newOcurrency.getLatLng()).toEqual([0, 0]);
  });
  it('should not create a ocurrency with a invalid userId', async () => {
    const ocurrencyData = {
      title: 'test',
      userId: 'invalid-id',
      type: 'test',
      time: '00:00',
      date: new Date(),
      public: true,
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    };

    const newOcurrency = new Ocurrency(ocurrencyData);

    await expect(newOcurrency.validate()).rejects.toThrow('userId');
  });
  it('should return a ocurrency with timestamps', async () => {
    const ocurrencyData = {
      title: 'test',
      userId: newUser._id,
      type: 'test',
      time: '00:00',
      date: new Date(),
      public: true,
      location: {
        type: 'Point',
        coordinates: [0, 0]
      }
    };

    const newOcurrency = new Ocurrency(ocurrencyData);
    await newOcurrency.save();
    const ocurrency = await Ocurrency.findOne({
      title: 'test'
    });

    expect(ocurrency).toHaveProperty('createdAt');
    expect(ocurrency).toHaveProperty('updatedAt');
  });
});
