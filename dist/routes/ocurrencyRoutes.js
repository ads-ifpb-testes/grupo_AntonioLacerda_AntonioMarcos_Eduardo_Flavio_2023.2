"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ocurrencyController_1 = require("../controllers/ocurrencyController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/public', authMiddleware_1.authMiddleware, ocurrencyController_1.OcurrencyController.index);
router.post('/', authMiddleware_1.authMiddleware, ocurrencyController_1.OcurrencyController.create);
router.delete('/:id', authMiddleware_1.authMiddleware, ocurrencyController_1.OcurrencyController.destroy);
router.get('/:userId', authMiddleware_1.authMiddleware, ocurrencyController_1.OcurrencyController.userOcurrencies);
exports.default = router;
//# sourceMappingURL=ocurrencyRoutes.js.map