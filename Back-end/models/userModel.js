const pool = require('../utils/modelUtil');

class UserModel {
	async GetUserByEmail(email) {
		try {
			let result = await pool.query(`SELECT * FROM user WHERE email = ?`, [email]);
			let data = result[0];
			return data;
		} catch (er) {
			console.log(error);
			return { error: 'there was a error' };
		}
	}

	async GetUserByUserName(username) {
		try {
			let result = await pool.query(`SELECT * FROM user WHERE username = ?`, [username]);
			let data = result[0];
			return data;
		} catch (er) {
			console.log(error);
			return { error: 'there was a error' };
		}
	}

	async InsertUser(name, username, email, password) {
		try {
			let result = await pool.query(`INSERT INTO user(name,username,email,password) VALUES (?,?,?,?)`, [name, username, email, password]);
			let data = result[0];
			return data;
		} catch (er) {
			console.log(error);
			return { error: 'there was a error' };
		}
	}
}

module.exports = UserModel;
