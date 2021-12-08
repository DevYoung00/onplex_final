import { db } from '../db/database.js';

export const getList= async () => {
	return db.
		execute(`SELECT * FROM seat`).then((result) => result[0]);
};
export const getBySeatId = async (seat_id) => {
	return db.
		execute(`SELECT * FROM seat WHERE seat_id=?`,[seat_id]).then((result) => result[0][0]);
};

export const getByPosition  = async (position) => {
	return db.
		execute(`SELECT * FROM seat WHERE position=?`,[position]).then((result) => result[0][0]);
};
