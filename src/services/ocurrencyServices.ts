import { OcurrencyDTO } from '../dtos/OcurrencyDTO';
import { NotFoundError } from '../helpers/api-errors';
import { Ocurrency } from '../models/Ocurrency';

const GetPublicOccurrecies = async () => {
  const ocurrency = await Ocurrency.findAll({
    where: {
      public: true
    }
  });
  return ocurrency;
};

const GetUserOccurrecies = async (userId: string) => {
  const ocurrency = await Ocurrency.findAll({
    where: {
      userId
    }
  });
  return ocurrency;
};

const CreateOcurrency = async (ocurrencyData: OcurrencyDTO) => {
  const newOcurrency = await Ocurrency.create({
    userId: ocurrencyData.userId,
    title: ocurrencyData.title,
    type: ocurrencyData.type,
    date: ocurrencyData.date,
    time: ocurrencyData.time,
    location: {
      type: 'Point',
      coordinates: [ocurrencyData.location.LNG, ocurrencyData.location.LTD]
    },
    public: ocurrencyData.public,
    createdAt: ocurrencyData.createdAt,
    updatedAt: ocurrencyData.updatedAt
  });
  return newOcurrency;
};

const DeleteOcurrency = async (id: string) => {
  const ocurrency = await Ocurrency.findByPk(id);
  if (!ocurrency) {
    throw new NotFoundError('Ocurrency not found');
  }
  await ocurrency.destroy();
  return;
};

export {
  GetPublicOccurrecies,
  GetUserOccurrecies,
  CreateOcurrency,
  DeleteOcurrency
};
