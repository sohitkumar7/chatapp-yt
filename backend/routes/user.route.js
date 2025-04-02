import express from "express";
import {signup,login, logout ,allUsers} from "../controller/user.controller.js";
import sercureRoute from "../middleware/secureRoute.js";
const router = express.Router()

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/allusers",sercureRoute, allUsers); 

export default router;