import express from "express";
import { orderControllers } from "./orders.controllers";
const router = express.Router();

router.post("/", orderControllers.insertOrder);
router.get("/", orderControllers.getOders);

export const orderRoutes = router;
