// routes/daily-profit-routes.ts
import { Router } from "express";
import { DailyProfitController } from "../controllers/profit-controller";
 

const router = Router();
const controller = new DailyProfitController();

router.get("/", controller.getAll.bind(controller));
router.get("/summary", controller.getSummary.bind(controller));

export default router;
