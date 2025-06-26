import { Router } from "express";
import { TareaController } from "./controllers/TareaController";
const apiRoot = "/v1";

const router = Router();

const tareaController = new TareaController();
router.use(apiRoot + tareaController.path, tareaController.router);

export default router;