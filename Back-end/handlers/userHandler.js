const UserModel = require('../models/userModel');
const Joi = require('joi');

const user_model = new UserModel();

class UserModel {
	async SignUpHandler(req, res) {
		let schema = {
			name: Joi.string().min(3).max(300).required(),
			username: Joi.string().min(3).max(300).required(),
			email: Joi.string().email().min(3).max(300).required(),
			password: Joi.string().min(3).max(400).required()
		};
		let validate = Joi.object(schema).validate(req.body);

		if (validate.error) {
			res.status(400).send({ error: validate.error.message });
		} else {
			let result = await user_model.GetUserByUserName(req.body.username);
			console.log(result);
			if (result.length > 0) {
				res.status(400).send({ error: 'the email is not unqiue' });
			} else {

			}
		}
	}
}

module.exports = UserModel;
