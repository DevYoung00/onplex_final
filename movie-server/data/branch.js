import { db } from '../db/database.js';

export const getList = async (addressCode = '%') => {
	return db
		.execute(`SELECT * FROM branch_office`)
		// .execute(`SELECT * FROM branch WHERE addressCode LIKE ?`, [addressCode])
		.then((result) => result[0]);
};

// export const getById = async (id) => {
// 	return db
// 		.execute(`SELECT * FROM branch WHERE id=?`, [id])
// 		.then((result) => result[0][0]);
// };

export const getById = async (branch_id) => {
	return db
		.execute(`SELECT * FROM branch_office WHERE branch_id=?`, [branch_id])
		.then((result) => result[0][0]);
}; //세윤코드
