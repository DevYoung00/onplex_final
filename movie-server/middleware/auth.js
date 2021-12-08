import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as memberRepository from '../data/member.js';
import * as nonmemberRepository from '../data/nonmember.js';
import * as staffRepository from '../data/staff.js';

export const isAuth = async (req, res, next) => {
	const authHeader = req.cookies.Authorization;
	if (!(authHeader && authHeader.startsWith('Bearer'))) {
		return res.status(200).send({ success: false, message: 'Unauthorized' });
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
		if (error) {
			return res.status(200).send({ success: false, message: 'Unauthorized' });
		}
		const member = await memberRepository.findById(decoded.id);
		if (!member) {
			return res.status(200).send({ success: false, message: 'Unauthorized' });
		}
		req.memberId = member.mem_id;
		next();
	});
};

export const isAuthCheck = async (req, res, next) => {
	const authHeader = req.cookies.Authorization;
	if (!(authHeader && authHeader.startsWith('Bearer'))) {
		return next();
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
		if (error) {
			return next();
		}
		const member = await memberRepository.findById(decoded.id);
		if (!member) {
			return next();
		}
		req.memberId = member.mem_id;
		next();
	});
};

export const isAuthNon = async (req, res, next) => {
	const authHeader = req.cookies.Authorization;
	if (!(authHeader && authHeader.startsWith('Bearer'))) {
		return res.status(200).send({ success: false, message: 'Unauthorized' });
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
		if (error) {
			return res.status(200).send({ success: false, message: 'Unauthorized' });
		}
		const nonmember = await nonmemberRepository.findById(decoded.id);
		if (!nonmember) {
			return res.status(200).send({ success: false, message: 'Unauthorized' });
		}
		req.nonmemberId = nonmember.nonmem_id;
		next();
	});
};

export const isAuthCheckNon = async (req, res, next) => {
	const authHeader = req.cookies.Authorization;
	if (!(authHeader && authHeader.startsWith('Bearer'))) {
		return next();
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
		if (error) {
			return next();
		}
		const nonmember = await nonmemberRepository.findById(decoded.id);
		if (!nonmember) {
			return next();
		}
		req.nonmemberId = nonmember.nonmem_id;
		next();
	});
};

export const isAuthStaff = async (req, res, next) => {
	const authHeader = req.cookies.Authorization;
	if (!(authHeader && authHeader.startsWith('Bearer'))) {
		return res.status(200).send({ success: false, message: 'Unauthorized1' });
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
		if (error) {
			return res.status(200).send({ success: false, message: 'Unauthorized2' });
		}
		console.log(decoded.id);
		const staff = await staffRepository.findById(decoded.id);
		if (!staff) {
			return res.status(200).send({ success: false, message: 'Unauthorized3' });
		}
		req.staffId = staff.staff_id;
		next();
	});
};

export const isAuthCheckStaff = async (req, res, next) => {
	const authHeader = req.cookies.Authorization;
	if (!(authHeader && authHeader.startsWith('Bearer'))) {
		return next();
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
		if (error) {
			return next();
		}
		const staff = await staffRepository.findById(decoded.id);
		if (!staff) {
			return next();
		}
		req.staffId = staff.staff_id;
		next();
	});
};