import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import * as staffRepository from '../data/staff.js';

// 이메일, 전화번호의 중복 여부를 확인
export const check = async (req, res) => {
  const { email, tel } = req.query;

  let found;
  if (email) {
    found = await staffRepository.findByEmail(email);
  }
  if (tel) {
    found = await staffRepository.findByPhoneNumber(tel);
  }
  if (found) {
    return res.send({
      success: false,
      message: `Already exists`,
    });
  }
  res.send({ success: true });
};

// 회원가입 (패스워드 bcrypt 암호화)
export const register = async (req, res) => {
  if (req.staffId) {
    return res.send({ success: false, message: `Already login` });
  }
  const { email, staffname, password, tel } = req.body;

  let found;
  found = await staffRepository.findByEmail(email);
  if (found) {
    return res.send({ success: false, message: `${email} is exists` });
  }
  found = await staffRepository.findByPhoneNumber(tel);
  if (found) {
    return res.send({ success: false, message: `${tel} is exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const staffId = await staffRepository.register({
    ...req.body,
    password: hashed,
  });
};

// 로그인 (패스워드와 db의 암호화된 패스워드를 비교 후 일치하면 로그인)
export const login = async (req, res) => {
  if (req.staffId) {
    return res.send({ success: false, message: `Already login` });
  }
  const { email, password } = req.body;
  const staff = await staffRepository.findByEmail(email);
  if (!staff) {
    return res.send({ success: false, message: 'Invalid information exists' });
  }
  const isValidPassword = await bcrypt.compare(password, staff.password);
  if (!isValidPassword) {
    return res.send({ success: false, message: 'Invalid information exists' });
  }
  const token = createJwtToken(staff.staff_id);
  console.log(token);
  res.cookie('Authorization', `Bearer ${token}`).send({
    success: true,
    staff: {
      email: staff.email,
      name: staff.staff_name,
    },
  });
};

// 로그아웃
export const logout = async (req, res) => {
  res.clearCookie('Authorization').send({ success: true });
};

// 마이 페이지
export const getMypage = async (req, res) => {
  const staff = await staffRepository.getMypage(req.staffId);
  if (!staff) {
    return res.send({ success: false, message: 'Invalid information exists' });
  }
  return res.send({ success: true, staff });
};

// 마이페이지 이름 수정
export const changeName = async (req, res) => {
  const { password, phone_num, account_num, local, adress } = req.body;
  const staffId = req.staffId;
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  if (staffId) {
    await staffRepository.update(
      hashed,
      phone_num,
      account_num,
      local,
      adress,
      staffId
    );
  }
  return res.send({ success: true, staffId });
};

// 직원 출근
export const attend = async (req, res) => {
  const staffId = req.staffId;
  let attendId;
  if (staffId) {
    attendId = await staffRepository.attend({ ...req.body, staffId });
  } else {
    console.log('There is no staff');
  }
  res.send({ success: true, attendId });
};

// 직원 근태
export const getSalary = async (req, res) => {
  const attend = await staffRepository.getAttend(req.staffId);
  const salary = await staffRepository.getSalary(req.staffId);
  res.send({
    success: true,
    attend,
    salary,
  });
};

// 재고 관리
export const getInventoryList = async (req, res) => {
  const inventoryList = await staffRepository.getInventoryList(req.staffId);
  res.send({
    success: true,
    inventoryList,
  });
};

// 시설 관리
export const getFacilityList = async (req, res) => {
  const facilityList = await staffRepository.getFacilityList(req.staffId);
  res.send({
    success: true,
    facilityList,
  });
};

// 매장 관리
export const getStoreList = async (req, res) => {
  const storeList = await staffRepository.getStoreList(req.staffId);
  const storeDetail = await staffRepository.getStoreDetail(req.staffId);
  res.send({
    success: true,
    storeList,
    storeDetail,
  });
};

// 추천 정보 불러오기
export const getRecommend = async (req, res) => {
  const staff = await staffRepository.getMypage(req.staffId);
  const coworker = await staffRepository.getCoworker(
    req.staffId,
    req.staffId,
    req.staffId
  );
  const recommend = await staffRepository.getRecommend(
    req.staffId,
    req.staffId
  );
  const rank = await staffRepository.getRank(req.staffId);
  res.send({
    success: true,
    staff,
    coworker,
    recommend,
    rank,
  });
};

// 추천 하기
export const recommend = async (req, res) => {
  const staffId = req.staffId;
  let recommendId;
  if (staffId) {
    recommendId = await staffRepository.recommend({ ...req.body, staffId });
  } else {
    console.log('There is no staff');
  }
  res.send({ success: true, recommendId });
};

// jwt 암호화 토큰 생성 함수
function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
