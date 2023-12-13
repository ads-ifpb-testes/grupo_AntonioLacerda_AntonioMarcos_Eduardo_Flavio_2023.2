"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.deleteUser = exports.updateUser = exports.createUser = exports.findUser = void 0;
const User_1 = require("../models/User");
const api_errors_1 = require("../helpers/api-errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const redis_1 = __importDefault(require("../database/redis"));
const hashPassword = async (password) => {
    return await (0, bcrypt_1.hash)(password, 10);
};
const generateToken = ({ email }) => {
    const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || '', {
        expiresIn: '8h'
    });
    return token;
};
exports.generateToken = generateToken;
const findUser = async (email) => {
    const user = await User_1.User.findOne({
        email: email
    });
    if (!user) {
        throw new api_errors_1.BadRequestError('User Not Found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};
exports.findUser = findUser;
const createUser = async (user) => {
    const userExists = await User_1.User.findOne({
        email: user.email
    });
    if (userExists) {
        throw new api_errors_1.BadRequestError('User already exists');
    }
    const createdUser = await User_1.User.create({
        email: user.email,
        name: user.name,
        password: await hashPassword(user.password),
        birthDate: user.birthDate,
        country: user.country,
        city: user.city,
        adress: user.adress,
        phone: user.phone
    });
    if (!createdUser) {
        throw new api_errors_1.InternalServerError('Error creating user');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = createdUser.toObject();
    const token = generateToken({ email: user.email });
    return { user: { ...userWithoutPassword }, token };
};
exports.createUser = createUser;
const updateUser = async (email, userData) => {
    const user = await User_1.User.findOne({
        email: email
    });
    if (!user) {
        throw new api_errors_1.BadRequestError('User not exists');
    }
    const updatedUser = await user.updateOne(userData);
    if (!updatedUser) {
        throw new api_errors_1.InternalServerError('Error updating user');
    }
    if (userData.email || userData.password) {
        await redis_1.default.set(String(userData === null || userData === void 0 ? void 0 : userData.email) || email, JSON.stringify({ email: userData.email || email, password: userData.password || user.password }));
    }
    ;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser.toObject();
    return userWithoutPassword;
};
exports.updateUser = updateUser;
const deleteUser = async (email) => {
    await User_1.User.findOneAndDelete({ email });
    await redis_1.default.del(email);
    return;
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userServices.js.map