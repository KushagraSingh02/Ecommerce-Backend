import express from "express";
import {registerController ,loginController} from '../controllers/authController.js'
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER USING POST METHOD
router.post('/register',registerController);

//LOGIN
router.post('/login',loginController)
export default router;