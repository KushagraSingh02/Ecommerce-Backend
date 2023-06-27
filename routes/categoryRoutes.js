import express from 'express';
import {requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import { createCategoryController } from '../controllers/categoryController.js';
const router = express.Router();

//routes
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);
// router.post('/create-category',createCategoryController);




export default router ;