import { OcurrencyDTO } from '../dtos/OcurrencyDTO';
import { Ocurrency } from '../models/Ocurrency';

const GetPublicOccurrecies = async () => {
  const ocurrency = await Ocurrency.findAll({
    where: {
      public: true
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

export { GetPublicOccurrecies, CreateOcurrency };
