"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGO_ATLAS_URL;
const connect = async function () {
    await mongoose_1.default
        .connect(url)
        .then(() => console.log('Conectado com o Mongo'))
        .catch((err) => console.log(err));
};
connect();
exports.default = mongoose_1.default;
//# sourceMappingURL=mongoose.js.map