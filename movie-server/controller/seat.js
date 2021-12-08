//세윤 코드

import * as seatRepository from '../data/seat.js';

export const getList = async (req, res) => {
	const { seat_id } = req.query;
	const seatList = await seatRepository.getList(seat_id);

	res.send({
		success: true,
		seatList
	});
};

export const getDetail = async (req, res) => {
	const { seat_id } = req.query;

	const seat = await seatRepository.getBySeatId(seat_id);
	if(!seat){
		return res.send({ success: false, message: "Invalid information exists"})
	};

	res.send({
		success: true,
		seat
	});
};


//유민 코드

// import * as seatRepository from '../data/seat.js';

// export const getList = async (req, res) => {
// 	const seatList = await seatRepository.getList();

// 	res.send({
// 		success: true,
// 		seatList
// 	});
// };

// export const getDetail = async (req, res) => {
// 	const { position } = req.query;

// 	const seat = await seatRepository.getByPosition(position);
// 	if(!seat){
// 		return res.send({ success: false, message: "Invalid information exists"})
// 	};

// 	res.send({
// 		success: true,
// 		seat
// 	});
// };
