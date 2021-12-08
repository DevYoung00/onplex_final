import express from 'express';
import * as branchController from '../controller/branch.js';

const router = express.Router();

router.get('/list', branchController.getList);

router.get('/', branchController.getDetail);

export default router;
