import { db } from '../db/database.js';

export const register = async (data) => {
  const {
    email,
    password,
    staffname,
    signumber,
    local = null,
    tel,
    account,
    branch,
    depart,
    adress = null,
    position = null,
  } = data;
  return db
    .execute(
      `INSERT INTO staff
			(email, password, staff_name, resident_num7, local, phone_num, account_num, branch_id, depart_id, address, position_id)
			VALUES (?,?,?,?,?,?,?,?,?,?,?)	
		`,
      [
        email,
        password,
        staffname,
        signumber,
        local,
        tel,
        account,
        branch,
        depart,
        adress,
        position,
      ]
    )
    .then((result) => result[0].insertId);
};

export const findById = async (id) => {
  return db
    .execute(`SELECT * FROM staff WHERE staff_id=?`, [id])
    .then((result) => result[0][0]);
};

export const findByEmail = async (email) => {
  return db
    .execute(`SELECT * FROM staff WHERE email=?`, [email])
    .then((result) => result[0][0]);
};

export const findByPhoneNumber = async (phoneNumber) => {
  return db
    .execute(`SELECT * FROM staff WHERE phone_num=?`, [phoneNumber])
    .then((result) => result[0][0]);
};

export const getMypage = async (id) => {
  return db
    .execute(
      `SELECT * FROM staff NATURAL JOIN branch_office NATURAL JOIN department WHERE staff_id=?`,
      [id]
    )
    .then((result) => result[0][0]);
};

export const update = async (password, tel, account, local, address, id) => {
  return db
    .execute(
      `UPDATE staff SET password=?, phone_num=?, account_num=?, local=?, address=? WHERE staff_id=?`,
      [password, tel, account, local, address, id]
    )
    .then((result) => result[0][0]);
};

export const attend = async (data) => {
  const { staffId, onwork, offwork, dates } = data;
  return db
    .execute(
      `INSERT INTO staff_attendance(staff_id, on_work, off_work, absent_day, paid_time_off, dates) VALUES (?,?,?,?,?,?)`,
      [staffId, onwork, offwork, null, null, dates]
    )
    .then((result) => result[0].insertId);
};

export const getAttend = async (id) => {
  return db
    .execute(
      `select staff_name, on_work, off_work, absent_day, paid_time_off, dates from staff_attendance natural join staff where staff_id=?`,
      [id]
    )
    .then((result) => result[0]);
};

export const getSalary = async (id) => {
  return db
    .execute(
      `select count(on_work)*80000, count(absent_day), count(paid_time_off) from staff_attendance where staff_id=?`,
      [id]
    )
    .then((result) => result[0]);
};

export const getInventoryList = async (id) => {
  return db
    .execute(
      `SELECT * FROM inventory_management NATURAL JOIN staff NATURAL JOIN branch_office WHERE staff_id=?`,
      [id]
    )
    .then((result) => result[0]);
};

export const getFacilityList = async (id) => {
  return db
    .execute(
      `SELECT * FROM facility_management NATURAL JOIN staff NATURAL JOIN branch_office WHERE staff_id=?`,
      [id]
    )
    .then((result) => result[0]);
};

export const getStoreList = async (id) => {
  return db
    .execute(
      `SELECT * FROM store NATURAL JOIN staff NATURAL JOIN branch_office WHERE staff_id=?`,
      [id]
    )
    .then((result) => result[0]);
};

export const getStoreDetail = async (id) => {
  return db
    .execute(
      `select store_id, dates, date_sales from ((sales_management natural join store) natural join staff) natural join branch_office where staff_name=(select staff_name from staff where staff_id=?)`,
      [id]
    )
    .then((result) => result[0]);
};

export const getCoworker = async (id) => {
  return db
    .execute(
      `select staff_id, staff_name, branch_name, depart_name, position_name from ((staff natural join branch_office) natural join department) natural join pposition where branch_id=(select branch_id from staff where staff_id=?) and depart_id=(select depart_id from staff where staff_id=?) and position_id=(select position_id from pposition natural join staff where staff_id=?)`,
      [id, id, id]
    )
    .then((result) => result[0]);
};

export const getRecommend = async (id) => {
  return db
    .execute(
      `select eval_id, staff_id, depart_id, branch_id, recommend_id, dates from staff_evaluation where branch_id=(select branch_id from branch_office natural join staff where staff_id=?) and depart_id=(select depart_id from staff natural join department where staff_id=?)`,
      [id, id]
    )
    .then((result) => result[0]);
};

export const getRank = async (id) => {
  return db
    .execute(
      `select recommend_id, dates, count(recommend_id) as recnt from staff_evaluation group by recommend_id order by count(recommend_id) desc`,
      [id]
    )
    .then((result) => result[0]);
};

export const recommend = async (data) => {
  const { staffId, departId, dates, recommendId, branchId } = data;
  return db
    .execute(
      `INSERT INTO staff_evaluation(staff_id, depart_id, dates, recommend_id, branch_id) VALUES (?,?,?,?,?)`,
      [staffId, departId, dates, recommendId, branchId]
    )
    .then((result) => result[0].insertId);
};
