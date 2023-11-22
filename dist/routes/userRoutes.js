"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/:email', authMiddleware_1.authMiddleware, userController_1.UserController.show);
router.post('/', userController_1.UserController.create);
router.put('/:email', authMiddleware_1.authMiddleware, userController_1.UserController.update);
router.delete('/:email', authMiddleware_1.authMiddleware, userController_1.UserController.destroy);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map