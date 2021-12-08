//세윤 코드
import { db } from '../db/database.js';

export const getList= async() => {
	return db.
		execute(`SELECT * FROM screen_schedule`).then((result) => result[0]);
};
export const getDetail = async() => {
	return db.
		execute(`SELECT * FROM screen_schedule WHERE scr_sch_id=?`,[scr_sch_id]).then((result) => result[0][0]);
};
/*
const sc = 'as screen_schedule';
const th = 'as theater';
const mv = 'as movie_info';
const br = 'as branch_office';

const selectQuery = `
			SELECT
				sc.scr_sch_id, sc.theater_id, sc.mov_id, th.branchId, sc.timeFrom ${sc}TimeFrom, 
				th.theather_floor ${th}Floor, th.number ${th}Number, th.type ${th}Type, th.limit ${th}Limit, (SELECT count(*) FROM ticketing WHERE ticketing.screenId=sc.id) as reserved,
				mv.title ${mv}Title, mv.dateFrom ${mv}DateFrom, mv.dateTo ${mv}DateTo, mv.runningTime ${mv}RunningTime, mv.grade ${mv}Grade, mv.genre ${mv}Genre, mv.country ${mv}Country,
				br.name ${br}Name, br.address ${br}Name, br.addressCode ${br}AdressCode, br.contact ${br}Contact
`;
const joinQuery = `
			FROM screen_schedule as sc
			JOIN theater as th ON sc.theater_id = th.theater_id
			JOIN movie_info as mv ON sc.mov_id = mv.mov_id
			JOIN branch_office as br ON br.branch_id = th.branch_id
`;

const limit = new Date(new Date().getTime() + 5184000000);

export const getList = async (movie_id = '%', addressCode = '%', s_date ='%') => {
	let timeFrom = new Date();
	let timeTo = limit;
	if(s_date !== '%') {
		timeFrom =  new Date(new Date(s_date).getTime() - 86400000);
		timeTo =  new Date(new Date(s_date).getTime() + 86400000);
	};
	console.log(timeFrom,timeTo)
	return db
		.execute(`${selectQuery} ${joinQuery} WHERE sc.timeFrom BETWEEN ? AND ? AND sc.mov_id LIKE ? AND br.branch_adr LIKE ?`,
			[timeFrom, timeTo, movie_id, addressCode])
		.then((result) => result[0]);
};

export const getDetail = async (id) => {
	return db.
		execute(`${selectQuery} ${joinQuery} WHERE sc.id=?
			`,[id]).then((result) => result[0][0]);
};

export const getByTheaterId = async (theaterId) => {
	return db.
		execute(`${selectQuery} ${joinQuery} WHERE th.id=? AND sc.timeFrom BETWEEN ? AND ?`,[theater_id,new Date(), limit]).then((result) => result[0]);
};

export const getByMovieId = async (movie_id , addressCode = '%', s_date = '%') => {
	let timeFrom = '%';
	let timeTo = limit;
	if(s_date !== '%') {
		timeFrom =  new Date(new Date(s_date).getTime() - 86400000);
		timeTo =  new Date(new Date(s_date).getTime() + 86400000);
	};
	console.log(timeFrom,timeTo,s_date,addressCode,movie_id)
	return db.
		execute(`${selectQuery} ${joinQuery} WHERE sc.movieId=? AND sc.timeFrom BETWEEN ? AND ? AND br.addressCode LIKE ?`,[movie_id, timeFrom, timeTo, addressCode]).then((result) => result[0]);
};

export const getById = async (id) => {
	return db.
		execute(`SELECT * FROM screen WHERE id=?`,[id]).then((result) => result[0][0]);
};*/

//유민 코드
// import { db } from '../db/database.js';

// const sc = 'as screen';
// const th = 'as theater';
// const mv = 'as movie';
// const br = 'as branch';

// export const getList= async() => {
// 	return db.
// 		execute(`SELECT * FROM screen_schedule`).then((result) => result[0]);
// };
// export const getDetail = async() => {
// 	return db.
// 		execute(`SELECT * FROM screen_schedule WHERE scr_sch_id=?`,[scr_sch_id]).then((result) => result[0][0]);
// };

// const selectQuery = `
// 			SELECT
// 				sc.id, sc.theaterId, sc.movieId, th.branchId, sc.timeFrom ${sc}TimeFrom, 
// 				th.floor ${th}Floor, th.number ${th}Number, th.type ${th}Type, th.limit ${th}Limit, (SELECT count(*) FROM ticketing WHERE ticketing.screenId=sc.id) as reserved,
// 				mv.title ${mv}Title, mv.dateFrom ${mv}DateFrom, mv.dateTo ${mv}DateTo, mv.runningTime ${mv}RunningTime, mv.grade ${mv}Grade, mv.genre ${mv}Genre, mv.country ${mv}Country,
// 				br.name ${br}Name, br.address ${br}Name, br.addressCode ${br}AdressCode, br.contact ${br}Contact
// `;
// const joinQuery = `
// 			FROM screen as sc
// 			JOIN theater as th ON sc.theaterId = th.id
// 			JOIN movie as mv ON sc.movieId = mv.id
// 			JOIN branch as br ON br.id = th.branchId
// `;

// const limit = new Date(new Date().getTime() + 5184000000);

// export const getList = async (movieId = '%', addressCode = '%', date ='%') => {
// 	let timeFrom = new Date();
// 	let timeTo = limit;
// 	if(date !== '%') {
// 		timeFrom =  new Date(new Date(date).getTime() - 86400000);
// 		timeTo =  new Date(new Date(date).getTime() + 86400000);
// 	};
// 	console.log(timeFrom,timeTo)
// 	return db
// 		.execute(`${selectQuery} ${joinQuery} WHERE sc.timeFrom BETWEEN ? AND ? AND sc.movieId LIKE ? AND br.addressCode LIKE ?`,
// 			[timeFrom, timeTo, movieId, addressCode])
// 		.then((result) => result[0]);
// };

// export const getDetail = async (id) => {
// 	return db.
// 		execute(`${selectQuery} ${joinQuery} WHERE sc.id=?
// 			`,[id]).then((result) => result[0][0]);
// };

// export const getByTheaterId = async (theaterId) => {
// 	return db.
// 		execute(`${selectQuery} ${joinQuery} WHERE th.id=? AND sc.timeFrom BETWEEN ? AND ?`,[theaterId,new Date(), limit]).then((result) => result[0]);
// };

// export const getByMovieId = async (movieId , addressCode = '%', date = '%') => {
// 	let timeFrom = '%';
// 	let timeTo = limit;
// 	if(date !== '%') {
// 		timeFrom =  new Date(new Date(date).getTime() - 86400000);
// 		timeTo =  new Date(new Date(date).getTime() + 86400000);
// 	};
// 	console.log(timeFrom,timeTo,date,addressCode,movieId)
// 	return db.
// 		execute(`${selectQuery} ${joinQuery} WHERE sc.movieId=? AND sc.timeFrom BETWEEN ? AND ? AND br.addressCode LIKE ?`,[movieId, timeFrom, timeTo, addressCode]).then((result) => result[0]);
// };

// export const getById = async (id) => {
// 	return db.
// 		execute(`SELECT * FROM screen WHERE id=?`,[id]).then((result) => result[0][0]);
// };
