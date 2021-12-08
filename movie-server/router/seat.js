import express from 'express';
import * as seatController from '../controller/seat.js';

const router = express.Router();

router.get('/list', seatController.getList);

router.get('/', seatController.getDetail);

export default router;
