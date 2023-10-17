"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ocurrency = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const User_1 = require("./User");
const Ocurrency = sequelize_2.default.define('ocurrency', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    title: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '00:00'
    },
    public: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    location: {
        type: sequelize_1.DataTypes.GEOMETRY,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.Ocurrency = Ocurrency;
Ocurrency.belongsTo(User_1.User, { foreignKey: 'userId' });
(async () => {
    await User_1.User.sync();
    await Ocurrency.sync();
})();
//# sourceMappingURL=Ocurrency.js.map