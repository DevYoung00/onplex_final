import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import * as memberRepository from '../data/member.js';

// 이메일, 전화번호의 중복 여부를 확인
export const check = async (req, res) => {
  const { email, tel } = req.query;

  let found;
  if (email) {
    found = await memberRepository.findByEmail(email);
  }
  if (tel) {
    found = await memberRepository.findByPhoneNumber(tel);
  }
  if (found) {
    return res.send({
      success: false,
      message: `Already exists`,
    });
  }
  res.send({ success: true });
};

// 회원가입
export const register = async (req, res) => {
  if (req.memberId) {
    return res.send({ success: false, message: `Already login` });
  }
  const { email, username, password, tel } = req.body;

  let found;
  found = await memberRepository.findByEmail(email);
  if (found) {
    return res.send({ success: false, message: `${email} is exists` });
  }
  found = await memberRepository.findByPhoneNumber(tel);
  if (found) {
    return res.send({ success: false, message: `${tel} is exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const memberId = await memberRepository.register({
    ...req.body,
    password: hashed,
  });
  /*const token = createJwtToken(memberId);
	res.cookie('Authorization', `Bearer ${token}`).send({
		success: true,
		member: {
			email,
			username,
		},
	});*/
};

// 로그인 (패스워드와 db의 암호화된 패스워드를 비교 후 일치하면 로그인)
export const login = async (req, res) => {
  if (req.memberId) {
    return res.send({ success: false, message: `Already login` });
  }
  const { email, password } = req.body;
  const member = await memberRepository.findByEmail(email);
  if (!member) {
    return res.send({ success: false, message: 'Invalid information exists' });
  }
  const isValidPassword = await bcrypt.compare(password, member.password);
  if (!isValidPassword) {
    return res.send({ success: false, message: 'Invalid information exists' });
  }
  const token = createJwtToken(member.mem_id);
  console.log(token);
  res.cookie('Authorization', `Bearer ${token}`).send({
    success: true,
    member: {
      email: member.email,
      name: member.mem_name,
    },
  });
};

// 로그아웃
export const logout = async (req, res) => {
  res.clearCookie('Authorization').send({ success: true });
};

// 마이페이지
export const getMypage = async (req, res) => {
  const review = await memberRepository.getReview(req.memberId);
  const ticket = await memberRepository.getTicket(req.memberId);
  const genre = await memberRepository.getGenre(req.memberId);
  const country = await memberRepository.getCountry(req.memberId);
  res.send({
    success: true,
    review,
    ticket,
    genre,
    country,
  });
};

// 리뷰작성
export const postReview = async (req, res) => {
  const memberId = req.memberId;
  if (!memberId) {
    return res.send({ success: false, message: `please login!` });
  }
  const { ticketid } = req.body;
  if (!ticketid) {
    return res.send({ success: false, message: `There is no ticket` });
  }

  const review = await memberRepository.postReview({
    ...req.body,
  });
  res.send({ success: true, review });
};

// jwt 암호화 토큰 생성 함수
function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
