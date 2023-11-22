"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcurrencyController = void 0;
const ocurrencyServices_1 = require("../services/ocurrencyServices");
const index = async (req, res) => {
    const ocurrencies = await (0, ocurrencyServices_1.GetPublicOccurrecies)();
    return res.send(ocurrencies);
};
const userOcurrencies = async (req, res) => {
    const { userId } = req.params;
    const ocurrencies = await (0, ocurrencyServices_1.GetUserOccurrecies)(userId);
    return res.send(ocurrencies);
};
const create = async (req, res) => {
    const ocurrency = req.body;
    const createdOcurrency = await (0, ocurrencyServices_1.CreateOcurrency)(ocurrency);
    return res.status(201).send(createdOcurrency);
};
const update = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const updatedOcurrency = await (0, ocurrencyServices_1.UpdateOcurrency)(id, newData);
    return res.send(updatedOcurrency);
};
const destroy = async (req, res) => {
    const { id } = req.params;
    await (0, ocurrencyServices_1.DeleteOcurrency)(id);
    return res.status(204).send();
};
exports.OcurrencyController = {
    index,
    userOcurrencies,
    create,
    update,
    destroy
};
//# sourceMappingURL=ocurrencyController.js.map