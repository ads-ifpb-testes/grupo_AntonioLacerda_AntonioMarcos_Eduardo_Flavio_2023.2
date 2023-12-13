"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOcurrency = exports.deleteOcurrency = exports.createOcurrency = exports.getUserOccurrecies = exports.getPublicOccurrecies = void 0;
const redis_1 = __importDefault(require("../database/redis"));
const api_errors_1 = require("../helpers/api-errors");
const Ocurrency_1 = require("../models/Ocurrency");
const User_1 = require("../models/User");
const getPublicOccurrecies = async () => {
    const key = `public`;
    const cachedOcurrency = await redis_1.default.lRange(key, 0, -1);
    if (cachedOcurrency) {
        cachedOcurrency.map((ocurrency) => {
            return JSON.parse(ocurrency);
        });
    }
    const ocurrency = await Ocurrency_1.Ocurrency.find({
        public: true
    });
    await redis_1.default.rPush(key, JSON.stringify(ocurrency));
    return ocurrency.map((ocurrency) => {
        return ocurrency.toObject();
    });
};
exports.getPublicOccurrecies = getPublicOccurrecies;
const getUserOccurrecies = async (userId) => {
    if (!userId) {
        throw new api_errors_1.BadRequestError('User id is required');
    }
    const key = `user:${userId}`;
    const cachedOcurrency = await redis_1.default.lRange(key, 0, -1);
    if (cachedOcurrency) {
        cachedOcurrency.map((ocurrency) => {
            return JSON.parse(ocurrency);
        });
    }
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new api_errors_1.NotFoundError('User not found');
    }
    const ocurrencies = await Ocurrency_1.Ocurrency.find({
        userId: userId
    });
    await redis_1.default.rPush(key, JSON.stringify(ocurrencies));
    return ocurrencies.map((ocurrency) => {
        return ocurrency.toObject();
    });
};
exports.getUserOccurrecies = getUserOccurrecies;
const createOcurrency = async (ocurrencyData) => {
    const newOcurrency = await Ocurrency_1.Ocurrency.create({
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
        throw new api_errors_1.BadRequestError('Ocurrency not created');
    }
    if (ocurrencyData.public) {
        await redis_1.default.rPush('public', JSON.stringify(newOcurrency.toObject()));
    }
    await redis_1.default.rPush(`user:${ocurrencyData.userId}`, JSON.stringify(newOcurrency.toObject()));
    return newOcurrency.toObject();
};
exports.createOcurrency = createOcurrency;
const updateOcurrency = async (id, newData) => {
    if (!id) {
        throw new api_errors_1.BadRequestError('Ocurrency id is required');
    }
    const ocurrency = await Ocurrency_1.Ocurrency.findById(id);
    if (!ocurrency) {
        throw new api_errors_1.NotFoundError('Ocurrency not found');
    }
    const updatedOcurrency = await Ocurrency_1.Ocurrency.findByIdAndUpdate(id, newData, { new: true });
    if (!updatedOcurrency) {
        throw new api_errors_1.BadRequestError('Ocurrency not updated');
    }
    if (updatedOcurrency.public && ocurrency.public) {
        await redis_1.default.lRem('public', 0, JSON.stringify(ocurrency.toObject()));
        await redis_1.default.lRem(`user:${ocurrency.userId}`, 0, JSON.stringify(ocurrency.toObject()));
        await redis_1.default.rPush('public', JSON.stringify(updatedOcurrency.toObject()));
        await redis_1.default.rPush(`user:${ocurrency.userId}`, JSON.stringify(updatedOcurrency.toObject()));
    }
    else if (updatedOcurrency.public && !ocurrency.public) {
        await redis_1.default.lRem(`user:${ocurrency.userId}`, 0, JSON.stringify(ocurrency.toObject()));
        await redis_1.default.rPush(`user:${ocurrency.userId}`, JSON.stringify(updatedOcurrency.toObject()));
        await redis_1.default.rPush('public', JSON.stringify(updatedOcurrency.toObject()));
    }
    else if (!updatedOcurrency.public && ocurrency.public) {
        await redis_1.default.lRem('public', 0, JSON.stringify(ocurrency.toObject()));
        await redis_1.default.lRem(`user:${ocurrency.userId}`, 0, JSON.stringify(ocurrency.toObject()));
        await redis_1.default.rPush(`user:${ocurrency.userId}`, JSON.stringify(updatedOcurrency.toObject()));
    }
    else {
        await redis_1.default.lRem(`user:${ocurrency.userId}`, 0, JSON.stringify(ocurrency.toObject()));
        await redis_1.default.rPush(`user:${ocurrency.userId}`, JSON.stringify(updatedOcurrency.toObject()));
    }
    return updatedOcurrency.toObject();
};
exports.updateOcurrency = updateOcurrency;
const deleteOcurrency = async (id) => {
    if (!id) {
        throw new api_errors_1.BadRequestError('Ocurrency id is required');
    }
    const ocurrency = await Ocurrency_1.Ocurrency.findById(id);
    if (!ocurrency) {
        throw new api_errors_1.NotFoundError('Ocurrency not found');
    }
    const deletedOcurrency = await ocurrency.deleteOne();
    if (!deletedOcurrency) {
        throw new api_errors_1.BadRequestError('Ocurrency not deleted');
    }
    if (ocurrency.public) {
        await redis_1.default.lRem('public', 0, JSON.stringify(ocurrency.toObject()));
    }
    await redis_1.default.lRem(`user:${ocurrency.userId}`, 0, JSON.stringify(ocurrency.toObject()));
    return;
};
exports.deleteOcurrency = deleteOcurrency;
//# sourceMappingURL=ocurrencyServices.js.map