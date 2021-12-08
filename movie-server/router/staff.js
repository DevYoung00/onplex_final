import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as staffController from '../controller/staff.js';
import { isAuthStaff, isAuthCheckStaff } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('email', 'email must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('password', 'password must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('staffname', 'staffname must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('signumber', 'signumber must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('tel', 'tel must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('account', 'account must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('branch', 'branch must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('depart', 'depart must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),

    validate,
  ],
  isAuthCheckStaff,
  staffController.register
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
  isAuthCheckStaff,
  staffController.login
);

router.post(
  '/change',
  [
    body('password', 'password must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
    body('phone_num', 'phone_num must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
    body('account_num', 'account_num must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
    body('local', 'local must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
    body('adress', 'adress must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
  ],
  isAuthCheckStaff,
  staffController.changeName
);

router.post(
  '/attend',
  [
    body('onwork', 'onwork must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('offwork', 'offwork must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('dates', 'dates must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
  ],
  isAuthCheckStaff,
  staffController.attend
);

router.post(
  '/recommend',
  [
    body('departId', 'onwork must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('dates', 'offwork must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('recommendId', 'dates must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    body('branchId', 'dates must be not blank').notEmpty().trim(),
    // .isLength({ min: 8, max: 18}),
    validate,
  ],
  isAuthCheckStaff,
  staffController.recommend
);

router.get('/salary', isAuthStaff, staffController.getSalary);
router.get('/mypage', isAuthStaff, staffController.getMypage);
router.get('/logout', isAuthStaff, staffController.logout);
router.get('/inventory', isAuthStaff, staffController.getInventoryList);
router.get('/facility', isAuthStaff, staffController.getFacilityList);
router.get('/store', isAuthStaff, staffController.getStoreList);
router.get('/rank', isAuthStaff, staffController.getRecommend);

export default router;
