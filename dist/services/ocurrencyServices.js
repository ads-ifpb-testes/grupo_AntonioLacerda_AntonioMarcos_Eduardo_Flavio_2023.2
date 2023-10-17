"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOcurrency = exports.CreateOcurrency = exports.GetUserOccurrecies = exports.GetPublicOccurrecies = void 0;
const api_errors_1 = require("../helpers/api-errors");
const Ocurrency_1 = require("../models/Ocurrency");
const GetPublicOccurrecies = async () => {
    const ocurrency = await Ocurrency_1.Ocurrency.findAll({
        where: {
            public: true
        }
    });
    return ocurrency;
};
exports.GetPublicOccurrecies = GetPublicOccurrecies;
const GetUserOccurrecies = async (userId) => {
    const ocurrency = await Ocurrency_1.Ocurrency.findAll({
        where: {
            userId
        }
    });
    return ocurrency;
};
exports.GetUserOccurrecies = GetUserOccurrecies;
const CreateOcurrency = async (ocurrencyData) => {
    const newOcurrency = await Ocurrency_1.Ocurrency.create({
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
exports.CreateOcurrency = CreateOcurrency;
const DeleteOcurrency = async (id) => {
    const ocurrency = await Ocurrency_1.Ocurrency.findByPk(id);
    if (!ocurrency) {
        throw new api_errors_1.NotFoundError('Ocurrency not found');
    }
    await ocurrency.destroy();
    return;
};
exports.DeleteOcurrency = DeleteOcurrency;
//# sourceMappingURL=ocurrencyServices.js.map