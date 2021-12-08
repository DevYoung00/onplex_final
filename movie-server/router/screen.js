import express from 'express';
import * as screenController from '../controller/screen.js';

const router = express.Router();

router.get('/list', screenController.getList);

router.get('/', screenController.getDetail);

export default router;
