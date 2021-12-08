import { db } from '../db/database.js';

export const getList = async () => {
  return db.execute(`SELECT * FROM movie_info`).then((result) => result[0]);
};

export const getReview = async () => {
  return db
    .execute(
      `SELECT * FROM movie_review NATURAL JOIN member_info NATURAL JOIN memticketing NATURAL JOIN movie_info`
    )
    .then((result) => result[0]);
};

export const getRankMovie = async () => {
  return db
    .execute(
      `select pos_link, mov_grade, count(mov_id) as movcnt, mov_id from memticketing natural join movie_info group by pos_link, mov_grade order by count(mov_id) desc`
    )
    .then((result) => result[0]);
};

export const getRankReview = async () => {
  return db
    .execute(
      `select mov_id, avg(mov_star) as movstars from movie_review natural join memticketing group by mov_id`
    )
    .then((result) => result[0]);
};
