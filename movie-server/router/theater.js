import express from 'express';
import * as theaterController from '../controller/theater.js';

const router = express.Router();

router.get('/list', theaterController.getList);

router.get('/', theaterController.getDetail);

export default router;
