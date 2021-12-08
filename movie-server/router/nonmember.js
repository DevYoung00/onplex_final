import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as nonmemberController from '../controller/nonmember.js';
import { isAuthNon, isAuthCheckNon } from '../middleware/auth.js';

const router = express.Router();

router.post('/register',
	[
		body('signumber', 'signumber must be not blank')
			.notEmpty()
			.trim(),
			// .isLength({ min: 8, max: 18}),
		body('tel', 'tel must be not blank')
			.notEmpty()
			.trim(),
			// .isLength({ min: 8, max: 18}),
		body('password', 'password must be not blank')
			.notEmpty()
			.trim(),
			// .isLength({ min: 8, max: 18}),
		validate
	],
	isAuthCheckNon, nonmemberController.register);

router.post('/',
	[
		body('signumber', 'signumber must be not blank')
			.notEmpty()
			.trim(),
			// .isLength({ min: 8, max: 18}),
		body('tel', 'tel must be not blank')
			.notEmpty()
			.trim(),
			// .isLength({ min: 8, max: 18}),
		body('password', 'password must be not blank')
			.notEmpty()
			.trim(),
			// .isLength({ min: 8, max: 18}),
	],
	isAuthCheckNon, nonmemberController.getProfile);

export default router;
