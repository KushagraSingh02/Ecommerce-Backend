import express from "express";
import {registerController ,loginController,forgotPasswordController} from '../controllers/authController.js'
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER USING POST METHOD
router.post('/register',registerController);

//FORGOT PASSWORD
router.post('/forgot-password',forgotPasswordController)

//LOGIN
router.post('/login',loginController)
export default router;