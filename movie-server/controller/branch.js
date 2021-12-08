import * as branchRepository from '../data/branch.js';
import * as theaterRepository from '../data/theater.js';
import * as screenRepository from '../data/screen.js';

export const getList = async (req, res) => {
	const { addressCode } = req.query;

	const branchList = await branchRepository.getList(addressCode);
	res.send({
		success: true,
		branchList,
	});
};

export const getDetail = async (req, res) => {
	const { id, depth } = req.query;
	const branch = await branchRepository.getById(id);
	if (!branch) {
		return res.send({ success: false, message: 'Invalid information exists' });
	}
	if (!depth || parseInt(depth) === 1) {
		return res.send({
			success: true,
			branch,
		});
	};
	const theaterList = await theaterRepository.getByBranchId(id);
	if (parseInt(depth) === 2) {
		return res.send({
			success: true,
			branch,
			theaterList,
		});
	};
	await Promise.all(theaterList.map(async (el) => 
		el.screenList = await screenRepository.getByTheaterId(el.id)
	));
	return res.send({
			success:true,
			branch,
			theaterList
	});
};
