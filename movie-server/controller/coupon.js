import * as couponRepository from '../data/coupon.js';

export const getList = async (req, res) => {
	const couponList = await couponRepository.getByMemberId(req.memberId);

	res.send({
		success: true,
		couponList,
	});
};
