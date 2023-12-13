"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_errors_1 = require("../helpers/api-errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const redis_1 = __importDefault(require("../database/redis"));
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new api_errors_1.UnauthorizedError('Não autorizado');
    }
    const [, token] = authorization.split(' ');
    const { email } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
    let user;
    const cache = await redis_1.default.get(email);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = cache ? user : user.toObject();
    req.user = userWithoutPassword;
    next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map