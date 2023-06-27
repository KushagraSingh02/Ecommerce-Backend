import express from 'express';
import {isAdmin,requireSignIn} from '../middlewares/authMiddleware.js';
import { createProductController } from '../controllers/productController.js';
import ExpressFormidable from 'express-formidable';
const router = express.Router()

//routes
//express formidable helps to upload photos and not let them convert to strings 
// router.post('/create-product',requireSignIn,isAdmin,ExpressFormidable(),createProductController );
router.post('/create-product',ExpressFormidable(),createProductController );



export default router