import { Router } from "express";
import { OcurrencyController } from "../controllers/oucrrencyController";

const router = Router();

router.get("/public", OcurrencyController.index)
router.post("/", OcurrencyController.create)

export default router;