import { db } from '../db/database.js';

export const register = async (data) => {
  const {
    password,
    username,
    email,
    local = null,
    tel,
    snsagree = null,
    signumber,
    adress = null,
  } = data;
  return db
    .execute(
      `INSERT INTO member_info
			(password, mem_name, email, local, phone_num, marketing_con, address, resident_num7)
			VALUES (?,?,?,?,?,?,?,?)	
		`,
      [password, username, email, local, tel, snsagree, adress, signumber]
    )
    .then((result) => result[0].insertId);
};

export const findById = async (id) => {
  return db
    .execute(`SELECT * FROM member_info WHERE mem_id=?`, [id])
    .then((result) => result[0][0]);
};

export const findByEmail = async (email) => {
  return db
    .execute(`SELECT * FROM member_info WHERE email=?`, [email])
    .then((result) => result[0][0]);
};

export const findByPhoneNumber = async (phoneNumber) => {
  return db
    .execute(`SELECT * FROM member_info WHERE phone_num=?`, [phoneNumber])
    .then((result) => result[0][0]);
};

export const getReview = async (id) => {
  return db
    .execute(
      `select mem_name, mov_id, mov_name, mov_star, mov_review, scr_date from ((movie_review natural join movie_info) natural join memticketing) natural join member_info where mem_name=(select mem_name from member_info where mem_id=?) order by scr_date desc`,

      [id]
    )
    .then((result) => result[0]);
};

export const getTicket = async (id) => {
  return db
    .execute(
      `select scr_date, mov_name, pos_link, memtkid, branch_name, s_time from (memticketing natural join movie_info) natural join branch_office where mem_id=? order by scr_date desc`,
      [id]
    )
    .then((result) => result[0]);
};

export const getGenre = async (id) => {
  return db
    .execute(
      `select mov_genre, count(mov_genre) as countGen from memticketing natural join movie_info where mem_id=? group by mov_genre order by count(mov_genre) desc`,
      [id]
    )
    .then((result) => result[0]);
};

export const getCountry = async (id) => {
  return db
    .execute(
      `select mov_country, count(mov_country) as countCont from memticketing natural join movie_info where mem_id=? group by mov_country order by count(mov_country) desc`,
      [id]
    )
    .then((result) => result[0]);
};

export const findByTicketId = async (id) => {
  return db
    .execute(`SELECT * FROM memticketing WHERE memtkid=?`, [id])
    .then((result) => result[0]);
};

export const postReview = async (data) => {
  const { ticketid, star, review } = data;
  return db
    .execute(
      `INSERT INTO movie_review
			(memtkid, mov_star, mov_review)
			VALUES (?,?,?)	
		`,
      [ticketid, star, review]
    )
    .then((result) => result[0].insertId);
};
