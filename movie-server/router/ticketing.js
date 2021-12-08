//세윤 코드

import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as ticketingController from '../controller/ticketing.js';
import { isAuthCheck } from '../middleware/auth.js';

const router = express.Router();

router.get('/list', ticketingController.getList);

router.get('/', ticketingController.getDetail);

router.post(
  '/ticketing',
  [
    body('movie', 'movie must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('theater', 'branch must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('date', 'detail must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('time', 'time must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('seat', 'seat must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
  ],
  isAuthCheck,
  ticketingController.getReservedList
);

router.post(
  '/cancel',
  [
    body('memtkid', 'memtkid must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
  ],
  isAuthCheck,
  ticketingController.cancel
);

export default router;
// router.post('/ticketing',
// 	[
// 		body('movie', 'movie must be not blank')
// 			.notEmpty()
// 			.trim(),
// 			// .isLength({ min: 8, max: 18}),
// 		body('theater', 'theater must be not blank')
// 			.notEmpty()
// 			.trim(),
// 			// .isLength({ min: 8, max: 18}),
// 		body('date', 'detail must be not blank')
// 			.notEmpty()
// 			.trim(),
// 			// .isLength({ min: 8, max: 18}),
// 		body('time', 'time must be not blank')
// 			.notEmpty()
// 			.trim(),
// 			// .isLength({ min: 8, max: 18}),
// 		body('seat', 'seat must be not blank')
// 			.notEmpty()
// 			.trim(),
// 			// .isLength({ min: 8, max: 18}),
// 		validate
// 	],
// 	isAuthCheck, ticketingController.getNonReservedList);
/*
router.post('/create',
	[
		body('type', 'type must be not blank')
			.notEmpty()
			.trim(),
			// .isLength({ min: 8, max: 18}),
		body('seat_id', 'seat_id must be not blank')
			.notEmpty()
			.trim()
			.isLength(12),
		body('screen_id', 'screen_id must be not blank')
			.notEmpty()
			.trim()
			.isNumeric(),
		validate
	],
	isAuthCheck, ticketingController.create);

router.get('/reserved', ticketingController.getReserved);

router.get('/list', isAuthCheck, ticketingController.getList);

//router.get('/detail', isAuthCheck, ticketingController.getDetail);

//router.get('/cancel', isAuthCheck, ticketingController.cancel);
/*
router.post('/nonmember/list',
	[
		body('nonmemberId', 'nonmemberId must be not blank')
			.notEmpty()
			.trim()
			.isNumeric(),
		validate
	],
	isAuthCheck, ticketingController.getListNon);*/
/*
router.post('/nonmember/detail',
	[
		body('nonmemberId', 'nonmemberId must be not blank')
			.notEmpty()
			.trim()
			.isNumeric(),
		validate
	],
	isAuthCheck, ticketingController.getDetailNon);*/
/*
router.post('/nonmember/cancel',
	[
		body('nonmemberId', 'nonmemberId must be not blank')
			.notEmpty()
			.trim()
			.isNumeric(),
		validate
	],
	isAuthCheck, ticketingController.cancelNon);*/

//유민 코드
// import express from 'express';
// import 'express-async-errors';
// import { body } from 'express-validator';
// import { validate } from '../middleware/validator.js';
// import * as ticketingController from '../controller/ticketing.js';
// import { isAuthCheck } from '../middleware/auth.js';

// const router = express.Router();

// router.post('/create',
// 	[
// 		body('type', 'type must be not blank')
// 			.notEmpty()
// 			.trim(),
// 			// .isLength({ min: 8, max: 18}),
// 		body('position', 'position must be not blank')
// 			.notEmpty()
// 			.trim()
// 			.isLength(3),
// 		body('screenId', 'screenId must be not blank')
// 			.notEmpty()
// 			.trim()
// 			.isNumeric(),
// 		validate
// 	],
// 	isAuthCheck, ticketingController.create);

// router.get('/reserved', ticketingController.getReserved);

// router.get('/list', isAuthCheck, ticketingController.getList);

// router.get('/detail', isAuthCheck, ticketingController.getDetail);

// router.get('/cancel', isAuthCheck, ticketingController.cancel);

// router.post('/nonmember/list',
// 	[
// 		body('nonmemberId', 'nonmemberId must be not blank')
// 			.notEmpty()
// 			.trim()
// 			.isNumeric(),
// 		validate
// 	],
// 	isAuthCheck, ticketingController.getListNon);

// router.post('/nonmember/detail',
// 	[
// 		body('nonmemberId', 'nonmemberId must be not blank')
// 			.notEmpty()
// 			.trim()
// 			.isNumeric(),
// 		validate
// 	],
// 	isAuthCheck, ticketingController.getDetailNon);

// router.post('/nonmember/cancel',
// 	[
// 		body('nonmemberId', 'nonmemberId must be not blank')
// 			.notEmpty()
// 			.trim()
// 			.isNumeric(),
// 		validate
// 	],
// 	isAuthCheck, ticketingController.cancelNon);

// export default router;
