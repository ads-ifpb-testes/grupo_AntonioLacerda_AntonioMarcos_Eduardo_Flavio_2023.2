"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});
(async () => {
    client.on('connect', () => {
        console.log('Redis client connected');
    });
    client.on('error', (err) => {
        console.log('Something went wrong ' + err);
    });
    await client.connect();
})();
exports.default = client;
//# sourceMappingURL=redis.js.map