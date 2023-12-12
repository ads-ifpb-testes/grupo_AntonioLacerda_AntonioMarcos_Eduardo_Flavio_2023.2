import { Request, Response } from 'express';
import {
  createOcurrency,
  deleteOcurrency,
  getPublicOccurrecies,
  getUserOccurrecies,
  updateOcurrency
} from '../services/ocurrencyServices';

const index = async (req: Request, res: Response) => {
  const ocurrencies = await getPublicOccurrecies();
  return res.send(ocurrencies);
};

const userOcurrencies = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const ocurrencies = await getUserOccurrecies(userId);
  return res.send(ocurrencies);
};

const create = async (req: Request, res: Response) => {
  const ocurrency = req.body;
  const createdOcurrency = await createOcurrency(ocurrency);
  return res.status(201).send(createdOcurrency);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newData = req.body;
  const updatedOcurrency = await updateOcurrency(id, newData);
  return res.send(updatedOcurrency);
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteOcurrency(id);
  return res.status(204).send();
};

export const OcurrencyController = {
  index,
  userOcurrencies,
  create,
  update,
  destroy
};
