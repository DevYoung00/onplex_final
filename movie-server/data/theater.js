import { db } from '../db/database.js';

export const getByBranchId = async (branchId) => {
	return db
		.execute(`SELECT * FROM theater WHERE branchId=?`, [branchId])
		.then((result) => result[0]);
};

export const getById = async (id) => {
	return db.
		execute(`SELECT * FROM theater WHERE id=?`,[id]).then((result) => result[0][0]);
};
