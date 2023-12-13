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
const redis_1 = __importDefault(require("../database/redis"));
const login = async (req, res) => {
    const { email, password } = req.body;
    let user;
    let cache = await redis_1.default.get(email);
    if (cache) {
        user = JSON.parse(cache);
    }
    else {
        user = await User_1.User.findOne({
            email
        });
        if (!user) {
            throw new api_errors_1.NotFoundError('User not Found');
        }
        await redis_1.default.set(email, JSON.stringify(user.toObject()));
    }
    const verifyPassword = await bcrypt_1.default.compare(password, user.password);
    if (!verifyPassword) {
        throw new api_errors_1.UnauthorizedError('Usuário ou senha incorretos');
    }
    const token = (0, userServices_1.generateToken)({ email });
    const { password: _, ...userWithoutPassword } = cache
        ? user
        : user.toObject();
    return res.send({
        userWithoutPassword,
        token
    });
};
exports.login = login;
//# sourceMappingURL=loginController.js.map