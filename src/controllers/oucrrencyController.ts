import { Request, Response } from "express";
import { CreateOcurrency, GetPublicOccurrecies } from "../services/ocurrencyServices";

const index = async (req: Request, res: Response) => {
    const ocurrencys = await GetPublicOccurrecies();
    return res.send(ocurrencys);
  };

const create = async (req: Request, res: Response) => {
    const ocurrency = req.body;
    const createdOcurrency = await CreateOcurrency(ocurrency);
    return res.status(201).send(createdOcurrency);
  };

export const OcurrencyController = {
    index, 
    create
}