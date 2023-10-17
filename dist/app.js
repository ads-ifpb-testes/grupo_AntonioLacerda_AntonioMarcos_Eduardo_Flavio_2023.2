"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = require("./middlewares/error");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const ocurrencyRoutes_1 = __importDefault(require("./routes/ocurrencyRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/user', userRoutes_1.default);
app.use('/ocurrency', ocurrencyRoutes_1.default);
app.use(loginRoutes_1.default);
app.use(error_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map