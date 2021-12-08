import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import memberRouter from './router/member.js';
import nonmemberRouter from './router/nonmember.js';
import couponRouter from './router/coupon.js';
import branchRouter from './router/branch.js';
import theaterRouter from './router/theater.js';
import movieRouter from './router/movie.js';
import seatRouter from './router/seat.js';
import screenRouter from './router/screen.js';
import ticketingRouter from './router/ticketing.js';
import staffRouter from './router/staff.js';

console.log(new Date().toString(), 'movie-server start');

// server 설정 및 라이브러리 호출
const app = express();
const corsOption = {
	origin: true,
	credentials: true,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());

// 요청 라우팅
app.use('/member', memberRouter);

app.use('/nonmember', nonmemberRouter);

app.use('/coupon', couponRouter);

app.use('/branch', branchRouter);

app.use('/theater', theaterRouter);

app.use('/movie', movieRouter);

app.use('/seat', seatRouter);

app.use('/screen', screenRouter);

app.use('/ticketing', ticketingRouter);

app.use('/staff', staffRouter);

// 에러 처리
app.use((req, res, next) => {
	res.sendStatus(404);
});

app.use((error, req, res, next) => {
	console.error(error);
	res.sendStatus(500);
});

app.listen(config.port.host);
