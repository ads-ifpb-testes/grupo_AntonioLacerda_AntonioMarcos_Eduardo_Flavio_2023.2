"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("../database/mongoose"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    adress: {
        type: String
    },
    phone: {
        type: String
    }
}, { timestamps: true });
exports.UserSchema = UserSchema;
const User = mongoose_2.default.model('User', UserSchema);
exports.User = User;
//# sourceMappingURL=User.js.map