"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcurrencySchema = exports.Ocurrency = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("../database/mongoose"));
const OcurrencySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    type: String,
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        default: '00:00'
    },
    public: {
        type: Boolean,
        required: true
    },
    location: {
        type: {
            type: String,
            required: true,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    }
}, { timestamps: true });
exports.OcurrencySchema = OcurrencySchema;
OcurrencySchema.method('getLatLng', function () {
    const { coordinates } = this.location;
    return [coordinates[0], coordinates[1]];
});
const Ocurrency = mongoose_2.default.model('Ocurrency', OcurrencySchema);
exports.Ocurrency = Ocurrency;
//# sourceMappingURL=Ocurrency.js.map