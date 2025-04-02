import sercureRoute from "../middleware/secureRoute.js";
import express from "express"
import { getMessage, sendMessage } from "../controller/message.controller.js";

const router = express.Router()
router.post("/send/:id",sercureRoute,sendMessage);
router.get("/get/:id",sercureRoute,getMessage);

export default router;