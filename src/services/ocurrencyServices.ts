import { Prisma, PrismaClient } from '@prisma/client';
import { OcurrencyDTO } from '../dtos/OcurrencyDTO';
import { Sql } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();



const query: Sql = Prisma.sql `INSERT INTO 'Ocurrency' ('userId', 'title', 'type', 'date', 'public', 'location')
VALUES ($1, $2, $3, $4, $5, ST_GeomFromText($6, 4326))` ;

const GetPublicOccurrecies = async() => {
    const ocurrency = await prisma.ocurrency.findMany({
        where: {
            public: true
        }
    })
    return ocurrency;
}

const CreateOcurrency = async(ocurrencyData: OcurrencyDTO) => {
    const newOcurrency = await prisma.$queryRaw(query, [ocurrencyData.userId, ocurrencyData.title,
         ocurrencyData.type, ocurrencyData.date, ocurrencyData.public, `POINT(${ocurrencyData.location.LNG} 
            ${ocurrencyData.location.LTD})`])
    return newOcurrency;
}

export {GetPublicOccurrecies, CreateOcurrency};