"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const User = sequelize_2.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    country: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    city: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    adress: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.User = User;
//# sourceMappingURL=User.js.map