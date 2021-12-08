import express from 'express';
import * as couponController from '../controller/coupon.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuth, couponController.getList);

export default router;
