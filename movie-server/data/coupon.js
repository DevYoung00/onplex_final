import { db } from '../db/database.js';

export const getByMemberId = async (memberId) => {
	return db
		.execute(`SELECT * FROM coupon where memberId=?`, [memberId])
		.then((result) => result[0]);
};

export const getById = async (id) => {
	return db
		.execute(`SELECT * FROM coupon WHERE id=?`, [id])
		.then((result) => result[0][0]);
};

export const used = async (id) => {
	return db
		.execute(`UPDATE coupon SET isUsed=? WHERE id=?`, [true, id])
		.then((result) => result[0][0]);
};
