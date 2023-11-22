"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOcurrency = exports.DeleteOcurrency = exports.CreateOcurrency = exports.GetUserOccurrecies = exports.GetPublicOccurrecies = void 0;
const api_errors_1 = require("../helpers/api-errors");
const Ocurrency_1 = require("../models/Ocurrency");
const User_1 = require("../models/User");
const GetPublicOccurrecies = async () => {
    const ocurrency = await Ocurrency_1.Ocurrency.find({
        public: true
    });
    return ocurrency.map((ocurrency) => {
        return ocurrency.toObject();
    });
};
exports.GetPublicOccurrecies = GetPublicOccurrecies;
const GetUserOccurrecies = async (userId) => {
    if (!userId) {
        throw new api_errors_1.BadRequestError('User id is required');
    }
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new api_errors_1.NotFoundError('User not found');
    }
    const ocurrency = await Ocurrency_1.Ocurrency.find({
        userId: userId
    });
    return ocurrency.map((ocurrency) => {
        return ocurrency.toObject();
    });
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
            coordinates: [
                ocurrencyData.location.coordinates[0],
                ocurrencyData.location.coordinates[1]
            ]
        },
        public: ocurrencyData.public
    });
    return newOcurrency.toObject();
};
exports.CreateOcurrency = CreateOcurrency;
const UpdateOcurrency = async (id, newData) => {
    if (!id) {
        throw new api_errors_1.BadRequestError('Ocurrency id is required');
    }
    const ocurrency = await Ocurrency_1.Ocurrency.findById(id);
    console.log(ocurrency);
    if (!ocurrency) {
        throw new api_errors_1.NotFoundError('Ocurrency not found');
    }
    const updatedOcurrency = await Ocurrency_1.Ocurrency.findByIdAndUpdate(id, newData, { new: true });
    console.log(updatedOcurrency);
    if (!updatedOcurrency) {
        throw new api_errors_1.BadRequestError('Ocurrency not updated');
    }
    return updatedOcurrency.toObject();
};
exports.UpdateOcurrency = UpdateOcurrency;
const DeleteOcurrency = async (id) => {
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
    return;
};
exports.DeleteOcurrency = DeleteOcurrency;
//# sourceMappingURL=ocurrencyServices.js.map