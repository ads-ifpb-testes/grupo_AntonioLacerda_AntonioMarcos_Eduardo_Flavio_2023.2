"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const User_1 = require("../models/User");
const api_errors_1 = require("../helpers/api-errors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userServices_1 = require("../services/userServices");
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw new api_errors_1.NotFoundError('Cade o menino de papai');
    }
    const verifyPassword = await bcrypt_1.default.compare(password, user.getDataValue('password'));
    if (!verifyPassword) {
        throw new api_errors_1.UnauthorizedError('Vai timbora carniça!!');
    }
    const token = (0, userServices_1.generateToken)({ email });
    const { password: _, ...userWithoutPassword } = user.dataValues;
    return res.send({
        userWithoutPassword,
        token
    });
};
exports.login = login;
//# sourceMappingURL=loginController.js.map