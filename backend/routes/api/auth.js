var express = require('express');
var auth = express.Router();
var jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { MYSQL, TOKENSECRET } = require('../../settings');
const multer = require('multer');
const upload = multer();

const accessTokenSecret = TOKENSECRET;
// {token: {id, login, password, email}]}

cookies = {};

// connect to mysql server
const connection = mysql.createConnection({
	host: MYSQL.host,
	user: MYSQL.user,
	password: MYSQL.password,
	database: MYSQL.name
});
connection.connect();

// check cookie, login, password
auth.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	let usersCookie = Object.keys(req.cookies);
	if (usersCookie.length >= 1 && !(usersCookie[0] in cookies))
		res.clearCookie(usersCookie[0]);
	next();
});


// FUNC FOR ROUTES
// Func for checking the email for universality
const checkEmail = (email) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT 1 FROM Users WHERE email = ?',
			[email],
			(err, results) => {
				if (err) reject(err);
				if (results.length > 0) resolve(true);
				else resolve(false);
			}
		);
	});
};

// Func for checking the login for universality
const checkLogin = (login) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT 1 FROM Users WHERE login = ?',
			[login],
			(err, results) => {
				if (err) reject(err);
				if (results.length > 0) resolve(true);
				else resolve(false);
			}
		);
	});
};

// check info
const checkUser = (loginOrMail, password, res) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT * FROM Users WHERE ? IN (email, login) LIMIT 1',
			[loginOrMail],
			(err, result) => {
				if (err) reject(err);

				if (result && result.length > 0) {
					if (result[0]['password'] === password) resolve(result);
					else {
						res.statusMessage = 'invalid password';
						resolve(401);
					}
				} else {
					res.statusMessage = 'account not found';
					resolve(401); // If there are no results, then the user is not identified
				}
			}
		);
	});
};

function isStrongPassword(password) {
    // Проверка длины пароля (минимум 8 символов)
    if (password.length < 8) {
        return false;
    }

    // Проверка наличия хотя бы одной заглавной буквы
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Проверка наличия хотя бы одной строчной буквы
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Проверка наличия хотя бы одной цифры
    if (!/\d/.test(password)) {
        return false;
    }

    // Проверка наличия хотя бы одного специального символа
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        return false;
    }

    // Если все проверки пройдены, вернуть true
    return true;
}

// ROUTES:
auth.get('/islogin', upload.none(), (req, res) => {
	let usersCookie = Object.keys(req.cookies);

	res.set('Cache-Control', 'no-store');

	if (usersCookie.length >= 1) {
		if (usersCookie[0] in cookies)
			res.json({
				login: cookies[usersCookie[0]].login
			});
		else {
			res.statusMessage = 'cookies are out of date';
			res.sendStatus(403);
		}
	} else {
		res.statusMessage = 'no cookies';
		res.sendStatus(403);
	}
});

// register page
auth.post('/register', upload.none(), (req, res) => {
	let login = req.body.login;
	let password = req.body.password;
	let email = req.body.email;

	//check info
	if (!(login.length && password.length && email.length)) {
		res.statusMessage = 'missing meaning';
		res.sendStatus(400);
		return;
	} else if (Object.keys(req.cookies).length > 0) {
		res.sendStatus(200);
		return; // If the user has cookies, the user is redirected to the home page
	}

	if (!isStrongPassword(password)) { // проверка на сложность пароля
		res.statusMessage = 'easy password';
		res.sendStatus(400);
		return;
	}

	// Use functions
	checkLogin(login)
		.then((isUse) => {
			if (isUse) {
				res.statusMessage = 'login is already in use';
				res.sendStatus(400);
				return;
			}
			checkEmail(email)
				.then((isUse) => {
					if (isUse) {
						res.statusMessage = 'email is already in use';
						res.sendStatus(400);
						return;
					}

					//save info to db
					sqlCode =
						'INSERT INTO Users (login, password, email) VALUES (?, ?, ?)';
					values = [login, password, email];
					connection.query(sqlCode, values, (err) => {
						if (err) {
							res.sendStatus(500);
							return;
						} else {
							// get id
							sqlCode =
								'SELECT id FROM Users WHERE login = ? AND password = ? AND email = ?';
							connection.query(sqlCode, values, (err, result) => {
								// create and save token
								if (err) res.sendStatus(500);
								else {
									id = result[0].id;
									let accessToken = jwt.sign(
										{ id: id, login: login, email: email },
										accessTokenSecret
									);
									cookies[accessToken] = {
										id: id,
										login: login,
										password: password,
										email: email
									};
									res.cookie(accessToken, '', {
										maxAge: 1000 * 60 * 60 * 24 * 30,
										httpOnly: true
									});
									res.sendStatus(200);
								}
							});
						}
					});
				})
				.catch(() => {
					res.sendStatus(500);
				});
		})
		.catch(() => {
			res.sendStatus(500);
		});
});

// login page
auth.post('/login', upload.none(), (req, res) => {
	const loginOrMail = req.body.loginOrMail;
	const password = req.body.password;

	if (!(loginOrMail.length && password.length)) {
		res.statusMessage = 'missing meaning';
		res.sendStatus(400);
		return;
	} else if (Object.keys(req.cookies).length > 0) {
		res.sendStatus(200);
		return; // If the user has cookies, the user is redirected to the logout page
	}

	checkUser(loginOrMail, password, res)
		.then((value) => {
			if (value == 401) res.sendStatus(401);
			else {
				value = value[0];
				let info = {
					id: value.id,
					login: value.login,
					email: value.email,
					password: value.password
				};
				let accessToken = jwt.sign(
					{ id: info.id, login: info.login, email: info.email },
					accessTokenSecret
				);
				cookies[accessToken] = info;
				res.cookie(accessToken, '', {
					maxAge: 1000 * 60 * 60 * 24 * 30,
					httpOnly: true
				});
				res.sendStatus(200);
			}
		})
		.catch((value) => {
			res.sendStatus(500);
		});
});

// logout
auth.get('/logout', function (req, res) {
	// Processing cookie
	let usersCookie = Object.keys(req.cookies)[0];

	delete cookies[usersCookie];
	res.clearCookie(usersCookie);
	res.redirect('/');
});

auth.getCookies = function () {
	return cookies;
};
module.exports = auth;
