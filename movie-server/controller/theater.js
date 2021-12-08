import * as theaterRepository from '../data/theater.js';
import * as screenRepository from '../data/screen.js';

export const getList = async (req, res) => {
	const { branchId } = req.query;

	const theaterList = await theaterRepository.getByBranchId(branchId);

	res.send({
		success: true,
		theaterList
	});
};

export const getDetail = async (req, res) => {
	const { id,depth } = req.query;

	const theater = await theaterRepository.getById(id);
	if(!depth || parseInt(depth) === 1) {
		return res.send({
			success: true,
			theater
		});
	};
	theater.screenList = await screenRepository.getByTheaterId(id);
	res.send({ success: true, theater });
};
