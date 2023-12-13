import client from '../database/redis';
import { IOcurrency } from '../dtos/OcurrencyDTO';
import { BadRequestError, NotFoundError } from '../helpers/api-errors';
import { Ocurrency } from '../models/Ocurrency';
import { User } from '../models/User';

const getPublicOccurrecies = async () => {
  const key = `public`;
  const cachedOcurrency = await client.get(key);
  if (cachedOcurrency) {
    return JSON.parse(cachedOcurrency);
  }
  const ocurrency = await Ocurrency.find({
    public: true
  });
  await client.set(key, JSON.stringify(ocurrency));
  return ocurrency.map((ocurrency) => {
    return ocurrency.toObject();
  });
};

const getUserOccurrecies = async (userId: string) => {
  if (!userId) {
    throw new BadRequestError('User id is required');
  }
  const key = `user:${userId}`;
  const cachedOcurrency = await client.get(key);
  if (cachedOcurrency) {
    return JSON.parse(cachedOcurrency);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  const ocurrency = await Ocurrency.find({
    userId: userId
  });
  await client.set(key, JSON.stringify(ocurrency));
  return ocurrency.map((ocurrency) => {
    return ocurrency.toObject();
  });
};

const createOcurrency = async (ocurrencyData: IOcurrency) => {
  const newOcurrency = await Ocurrency.create({
    userId: ocurrencyData.userId,
    title: ocurrencyData.title,
    type: ocurrencyData.type,
    date: ocurrencyData.date,
    time: ocurrencyData.time,
    location: {
      type: 'Point',
      coordinates: [
        ocurrencyData.location.coordinates[0],
        ocurrencyData.location.coordinates[1]
      ]
    },
    public: ocurrencyData.public
  });
  if (!newOcurrency) {
    throw new BadRequestError('Ocurrency not created');
  }
  const cachedPrivateOcurrency = await client.get(`user:${ocurrencyData.userId}`);
  if (newOcurrency.public) {
    const cachedPublicOcurrency = await client.get(`public`);
    const parsedCachedPublicOcurrency = JSON.parse(cachedPublicOcurrency as string);
    parsedCachedPublicOcurrency.push(newOcurrency.toObject());
    await client.set(`public`, JSON.stringify(parsedCachedPublicOcurrency));
  }
  const cachedPrivateOcurrencyParsed = JSON.parse(cachedPrivateOcurrency as string);
  cachedPrivateOcurrencyParsed.push(newOcurrency.toObject());
  await client.set(`user:${ocurrencyData.userId}`, JSON.stringify(cachedPrivateOcurrencyParsed));
  return newOcurrency.toObject();
};

const updateOcurrency = async (id: string, newData: Partial<IOcurrency>) => {
  if (!id) {
    throw new BadRequestError('Ocurrency id is required');
  }
  const ocurrency = await Ocurrency.findById(id);
  if (!ocurrency) {
    throw new NotFoundError('Ocurrency not found');
  }
  const updatedOcurrency = await Ocurrency.findByIdAndUpdate(id, newData, { new: true });
  if (!updatedOcurrency) {
    throw new BadRequestError('Ocurrency not updated');
  }
  const cachedPrivateOcurrency = await client.get(`user:${ocurrency.userId}`);
  if (ocurrency.public) {
    const cachedPublicOcurrency = await client.get(`public`);
    const parsedCachedPublicOcurrency = JSON.parse(cachedPublicOcurrency as string);
    const index = parsedCachedPublicOcurrency.findIndex((o: any) => o._id === id);
    parsedCachedPublicOcurrency.splice(index, 1);
    parsedCachedPublicOcurrency.push(updatedOcurrency.toObject());
    await client.set(`public`, JSON.stringify(parsedCachedPublicOcurrency));
  }
  const cachedPrivateOcurrencyParsed = JSON.parse(cachedPrivateOcurrency as string);
  const index = cachedPrivateOcurrencyParsed.findIndex((o: any) => o._id === id);
  cachedPrivateOcurrencyParsed.splice(index, 1);
  cachedPrivateOcurrencyParsed.push(updatedOcurrency.toObject());
  await client.set(`user:${ocurrency.userId}`, JSON.stringify(cachedPrivateOcurrencyParsed));
  return updatedOcurrency.toObject();
};

const deleteOcurrency = async (id: string) => {
  if (!id) {
    throw new BadRequestError('Ocurrency id is required');
  }
  const ocurrency = await Ocurrency.findById(id);
  if (!ocurrency) {
    throw new NotFoundError('Ocurrency not found');
  }
  const deletedOcurrency = await ocurrency.deleteOne();
  if (!deletedOcurrency) {
    throw new BadRequestError('Ocurrency not deleted');
  }
  const cachedPrivateOcurrency = await client.get(`user:${ocurrency.userId}`);
  if (ocurrency.public) {
    const cachedPublicOcurrency = await client.get(`public`);
    const parsedCachedPublicOcurrency = JSON.parse(cachedPublicOcurrency as string);
    const index = parsedCachedPublicOcurrency.findIndex((o: any) => o._id === id);
    parsedCachedPublicOcurrency.splice(index, 1);
    await client.set(`public`, JSON.stringify(parsedCachedPublicOcurrency));
  }
  const cachedPrivateOcurrencyParsed = JSON.parse(cachedPrivateOcurrency as string);
  const index = cachedPrivateOcurrencyParsed.findIndex((o: any) => o._id === id);
  cachedPrivateOcurrencyParsed.splice(index, 1);
  await client.set(`user:${ocurrency.userId}`, JSON.stringify(cachedPrivateOcurrencyParsed));
  return;
};

export {
  getPublicOccurrecies,
  getUserOccurrecies,
  createOcurrency,
  deleteOcurrency,
  updateOcurrency
};
