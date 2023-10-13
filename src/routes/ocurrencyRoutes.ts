import { Router } from "express";
import { OcurrencyController } from "../controllers/ocurrencyController";

const router = Router();

router.get("/public", OcurrencyController.index);
router.post("/", OcurrencyController.create);
router.delete("/:id", OcurrencyController.destroy)
router.get("/:userId", OcurrencyController.userOcurrencies)

export default router;