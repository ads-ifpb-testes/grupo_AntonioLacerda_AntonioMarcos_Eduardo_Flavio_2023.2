"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userServices_1 = require("../services/userServices");
const show = async (req, res) => {
    const { email } = req.params;
    const user = await (0, userServices_1.findUser)(email);
    return res.send(user);
};
const create = async (req, res) => {
    const user = req.body;
    const createdUser = await (0, userServices_1.createUser)(user);
    return res.status(201).send(createdUser);
};
const update = async (req, res) => {
    const { email } = req.params;
    const userData = req.body;
    const updatedUser = await (0, userServices_1.updateUser)(email, userData);
    return res.send(updatedUser);
};
const destroy = async (req, res) => {
    const { email } = req.params;
    await (0, userServices_1.deleteUser)(email);
    return res.status(204).send();
};
exports.UserController = {
    show,
    create,
    update,
    destroy
};
//# sourceMappingURL=userController.js.map