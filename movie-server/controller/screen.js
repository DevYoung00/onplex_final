//세윤 코드

import * as screenRepository from '../data/screen.js';

export const getList = async (req, res) => {
	const { mov_id, date } = req.query;

	const screenList = await screenRepository.getList(mov_id, date);

	res.send({ success: true, screenList });

};

export const getDetail = async (req, res) => {
	const { scr_sch_id } = req.query;

	const screen = await screenRepository.getDetail(scr_sch_id);
	if(!screen){
		return res.send({ success: false, message: "Invalid information exists"})
	};

	res.send({ success: true, screen });
};


//유민 코드

// import * as screenRepository from '../data/screen.js';

// export const getList = async (req, res) => {
// 	const { movieId, addressCode, date } = req.query;

// 	const screenList = await screenRepository.getList(movieId, addressCode, date);

// 	res.send({ success: true, screenList });

// };

// export const getDetail = async (req, res) => {
// 	const { id } = req.query;

// 	const screen = await screenRepository.getDetail(id);
// 	if(!screen){
// 		return res.send({ success: false, message: "Invalid information exists"})
// 	};

// 	res.send({ success: true, screen });
// };
