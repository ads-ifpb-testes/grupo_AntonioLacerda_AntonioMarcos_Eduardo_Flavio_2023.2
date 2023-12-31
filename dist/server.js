"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.SERVER_PORT || 3000;
app_1.default.listen(port, () => {
    console.log(`O servidor foi iniciado na porta ${port}`);
});
//# sourceMappingURL=server.js.map