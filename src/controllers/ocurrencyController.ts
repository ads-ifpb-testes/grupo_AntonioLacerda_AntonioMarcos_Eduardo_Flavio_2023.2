import { Request, Response } from "express";
import { CreateOcurrency, DeleteOcurrency, GetPublicOccurrecies, GetUserOccurrecies } from "../services/ocurrencyServices";

const index = async (req: Request, res: Response) => {
    const ocurrencies = await GetPublicOccurrecies();
    return res.send(ocurrencies);
  };

const userOcurrencies =async (req:Request, res: Response) => {
  const {userId} = req.params;
  const ocurrencies = await GetUserOccurrecies(userId);
  return res.send(ocurrencies);
}

const create = async (req: Request, res: Response) => {
    const ocurrency = req.body;
    const createdOcurrency = await CreateOcurrency(ocurrency);
    return res.status(201).send(createdOcurrency);
  };

const destroy =async (req:Request, res: Response) => {
  const {id} = req.params;
  await DeleteOcurrency(id);
  return res.status(204).send();
}

export const OcurrencyController = {
    index,
    userOcurrencies,
    create,
    destroy
}