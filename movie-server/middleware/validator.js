import { validationResult } from 'express-validator';
export const validate = (req, res, next) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		return next();
	}
	const { errors } = result;
	console.log(errors);
	return res.send({
		success: false,
		errors,
	});
};
