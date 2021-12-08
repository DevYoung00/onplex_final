import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as memberController from '../controller/member.js';
import { isAuth, isAuthCheck } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('password', 'password must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('username', 'name must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('email', 'email must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('tel', 'address must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('signumber', 'signumber must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
  ],
  isAuthCheck,
  memberController.register
);

router.post(
  '/login',
  [
    body('email', 'email must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('password', 'password must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
  ],
  isAuthCheck,
  memberController.login
);

router.post(
  '/review',
  [
    body('ticketid', 'ticketid must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('star', 'star must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('review', 'review must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
  ],
  isAuthCheck,
  memberController.postReview
);

router.get('/check', memberController.check);
router.get('/logout', isAuth, memberController.logout);
router.get('/mypage', isAuth, memberController.getMypage);

export default router;
