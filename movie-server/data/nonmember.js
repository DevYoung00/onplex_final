import { db } from '../db/database.js';

export const register = async (data) => {
	const { signumber, tel, password } = data;
	return db
		.execute(
			`INSERT INTO non_member_info (resident_num7, phone_num, password) VALUES (?,?,?)`,
			[signumber, tel, password]
		)
		.then((result) => result[0].insertId);
};

export const update = async (password, id) => {
	return db
		.execute(`UPDATE non_member_info SET password=? WHERE nonmem_id=?`, [password, id])
		.then((result) => result[0][0]);
};

export const findByData = async (phoneNumber, residentNumber) => {
	return db
		.execute(
			`SELECT * FROM non_member_info WHERE phone_num=? AND resident_num7=?`,
			[phoneNumber, residentNumber]
		)
		.then((result) => result[0][0]);
};

export const findById = async (id) => {
	return db
		.execute(
			`SELECT * FROM non_member_info WHERE nonmem_id=?`,
			[id]
		)
		.then((result) => result[0][0]);
};
