//세윤 코드

import { db } from '../db/database.js';

export const getMovieList = async () => {
  return db.execute(`SELECT * FROM movie_info`).then((result) => result[0]);
};
export const getByMovie = async () => {
  return db
    .execute(`SELECT * FROM movie_info WHERE mov_id=?`, [mov_id])
    .then((result) => result[0][0]);
};

export const getBranchList = async () => {
  return db.execute(`SELECT * FROM branch_office`).then((result) => result[0]);
};
export const getByBranch = async () => {
  return db
    .execute(`SELECT * FROM branch_office WHERE branch_id=?`, [branch_id])
    .then((result) => result[0][0]);
};

export const getDateList = async () => {
  return db
    .execute('SELECT * FROM screen_schedule')
    .then((result) => result[0]);
};
export const getByDate = async () => {
  return db
    .execute(`SELECT * FROM screen_schedule WHERE scr_date=?`, [scr_date])
    .then((result) => result[0][0]);
};

export const getMemTicketingList = async (data) => {
  const { memberId, movie, theater, date, time = null, seat } = data;
  return db
    .execute(
      `INSERT INTO memticketing
		(mem_id, mov_id, branch_id, scr_date, s_time, seat_id)
		VALUES (?,?,?,?,?,?)	
	`,
      [memberId.mem_id, movie.mov_id, theater.branch_id, date, time, seat]
    )
    .then((result) => result[0].insertId);
};

export const getMemTicketingResult = async (mem_id, mov_id) => {
  console.log(mem_id, mov_id);
  return db
    .execute(`SELECT * FROM memticketing WHERE mem_id=? AND mov_id=?`, [
      mem_id,
      mov_id,
    ])
    .then((result) => result[0]);
};

export const getByMemTicketing = async (id) => {
  return db
    .execute('SELECT * FROM memticketing WHERE id=?', [id])
    .then((result) => result[0][0]);
};

export const getNonmemTicketingList = async (data) => {
  const { movie, theater, date, time, seat } = data;
  return db
    .execute(
      `INSERT INTO nonmemticketing
		(mov_id, branch_id, scr_date, s_time, seat_id)
		VALUES (?,?,?,?,?)	
	`,
      [movie, theater, date, time, seat]
    )
    .then((result) => result[0].insertId);
};

export const getByNonmemTicketing = async (id) => {
  return db
    .execute('SELECT * FROM nonmemticketing WHERE id=?', [id])
    .then((result) => result[0][0]);
};

export const findByMovId = async (movie) => {
  console.log(movie);
  return db
    .execute(`SELECT mov_id FROM movie_info WHERE mov_name=?`, [movie])
    .then((result) => result[0][0]);
};

export const findByBranchId = async (theater) => {
  return db
    .execute(`SELECT branch_id FROM branch_office WHERE branch_name=?`, [
      theater,
    ])
    .then((result) => result[0][0]);
};

export const cancelTicketing = async (memtkid) => {
  return db
    .execute('DELETE FROM memticketing WHERE memtkid=?', [memtkid])
    .then((result) => result[0][0]);
};

//유민 코드
// import { db } from '../db/database.js';

// export const create = async (data) => {
// 	const { memberId, type, point = null, position, screenId, couponId = null } = data;
// 	return db.
// 		execute(
// 			`INSERT INTO ticketing (type, point, position, screenId, couponId, memberId, createdAt, canceledAt, refusedAt, isState, nonmemberId) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
// 			[type, point, position, screenId, couponId, memberId, new Date(), null, null, 'reserved', null]
// 		).then((result) => result[0].insertId);
// };

// export const createNon = async (data) => {
// 	const { nonmemberId , type, point = null, position, screenId, couponId = null } = data;
// 	return db.
// 		execute(
// 			`INSERT INTO ticketing (type, point, position, screenId, couponId, memberId, createdAt, canceledAt, refusedAt, isState, nonmemberId) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
// 			[type, null , position, screenId, null , null, new Date(), null, null, 'reserved', nonmemberId]
// 		).then((result) => result[0].insertId);
// };

// export const getByPositionAndScreenId = async (position,screenId) => {
// 	return db.execute(`
// 			SELECT tk.*, sc.* FROM ticketing as tk
// 			JOIN screen as sc ON tk.screenId = sc.id
// 			WHERE tk.position=? AND tk.screenId=?
// 		`,[position,screenId]).then((result) => result[0][0]);
// };

// export const getByScreenId = async (screenId) => {
// 	return db.execute(`
// 			SELECT position FROM ticketing WHERE screenId=? AND isState=? ORDER BY position`,
// 		[screenId, 'reserved']).then((result) => result[0]);
// };

// const tk = 'as ticketing'
// const cp = 'as coupon'
// const sc = 'as screen'
// const th = 'as theater'
// const br = 'as branch'
// const mv = 'as movie'
// const mm = 'as member'
// const nm = 'as nonmember'
// const selectQuery = `
// 			SELECT
// 				tk.id, tk.memberId, tk.nonmemberId, tk.couponId, sc.id ${sc}Id, th.id ${th}Id, br.id ${br}Id, mv.id ${mv}Id,
// 				tk.type ${tk}Type, tk.point ${tk}Point, tk.createdAt ${tk}CreatedAt, tk.canceledAt ${tk}CanceledAt, tk.refusedAt ${tk}RefusedAt, tk.isState ${tk}IsState, tk.position ${tk}Position, st.cost ${tk}Cost,
// 				sc.timeFrom ${sc}TimeFrom,
// 				th.floor ${th}Floor, th.number ${th}Number, th.type ${th}Type, th.limit ${th}Limit,
// 				mv.title ${mv}Title, mv.dateFrom ${mv}DateFrom, mv.dateTo ${mv}DateTo, mv.runningTime ${mv}RunningTime, mv.grade ${mv}Grade, mv.genre ${mv}Genre, mv.country ${mv}Country,
// 				br.name ${br}Name, br.address ${br}Name, br.addressCode ${br}AdressCode, br.contact ${br}Contact
// 			`
// const joinQuery = `
// 			FROM ticketing as tk
// 			JOIN screen as sc ON tk.screenId=sc.id
// 			JOIN seat as st ON tk.position=st.position
// 			JOIN theater as th ON sc.theaterId=th.id
// 			JOIN branch as br ON th.branchId=br.id
// 			JOIN movie as mv ON sc.movieId= mv.id
// 			`

// export const getByMemberId = async (memberId) => {
// 	return db.execute(`${selectQuery}, mm.name ${mm}Name, mm.email ${mm}Email, mm.phoneNumber ${mm}PhoneNumber ${joinQuery} JOIN member as mm ON tk.memberId=mm.id WHERE tk.memberId=? ORDER BY tk.createdAt DESC`,
// 		[memberId]).then((result) => result[0]);

// };

// export const getByNonmemberId = async (nonmemberId) => {
// 	return db.execute(`${selectQuery}, nm.phoneNumber ${nm}PhoneNumber ${joinQuery} JOIN nonmember as nm ON tk.nonmemberId=nm.id WHERE tk.nonmemberId=? ORDER BY tk.createdAt DESC`,
// 		[nonmemberId]).then((result) => result[0]);

// };

// export const getById = async (id) => {
// 	return db.execute(`${selectQuery} ${joinQuery} WHERE tk.id=?`,
// 		[id]).then((result) => result[0][0]);

// };

// export const cancel = async (id) => {
// 	return db.execute(`UPDATE ticketing SET canceledAt=?, isState=? WHERE id=?`,[new Date(), 'canceled',id])
// };
