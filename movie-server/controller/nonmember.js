import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import * as nonmemberRepository from '../data/nonmember.js';

// 비회원 등록
export const register = async (req, res) => {
	if (req.nonmemberId) {
		return res.send({ success: false, message: `Already login` });
	}
	const { signumber, tel, password } = req.body;

	const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
	const nonmemberId = await nonmemberRepository.register({
		...req.body,
		password: hashed,
	});

	const token = createJwtToken(nonmemberId.nonmem_id);
	console.log(token)
	res.cookie('Authorization', `Bearer ${token}`).send({
		success: true,
		nonmember: {
			tel,
			signumber,
		},
	});

	// 전화번호와 주민번호로 비회원 정보 조회
	/*const nonmember = await nonmemberRepository.findByData(
		tel,
		signumber
	);


	let isNew = false;
	let nonmemberId;
	const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

	if (nonmember) {
		await nonmemberRepository.update(hashed, nonmember.nonmem_id);
		nonmemberId = nonmember.nonmem_id;
	} else {
		nonmemberId = await nonmemberRepository.register({
			...req.body,
			pwNonmember: hashed,
		});
		isNew = true;
	}

	res.send({
		success: true,
		isNew,
		nonmemberId,
	});*/
};

export const getProfile = async (req, res) => {
	if (req.memberId) {
		return res.send({ success: false, message: `Already login` });
	}
	const { password, phoneNumber, residentNumber } = req.body;
	const nonmember = await nonmemberRepository.findByData(
		phoneNumber,
		residentNumber
	);
	if (!nonmember) {
		return res.send({ success: false, message: 'Invalid information exists' });
	}
	const isValidPassword = await bcrypt.compare(password, nonmember.password);
	if (!isValidPassword) {
		return res.send({ success: false, message: 'Invalid information exists' });
	};
	res.send({ success: true, nonmemberId: nonmember.id });
};

function createJwtToken(id) {
	return jwt.sign({ id }, config.jwt.secretKey, {
		expiresIn: config.jwt.expiresInSec,
	});
}
