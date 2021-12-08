import express from 'express';
import * as movieController from '../controller/movie.js';

const router = express.Router();

router.get('/list', movieController.getList);
router.get('/review', movieController.getReview);
router.get('/rank', movieController.getRank);

export default router;
