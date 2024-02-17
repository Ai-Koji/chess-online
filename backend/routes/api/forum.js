var express = require('express');
var forum = express.Router();
const mysql = require('mysql');
const { MYSQL } = require('../../settings');
const multer = require('multer');
const upload = multer();
var auth = require('./auth');

// connect to mysql server
const connection = mysql.createConnection({
	host: MYSQL.host,
	user: MYSQL.user,
	password: MYSQL.password,
	database: 'chess_online'
});
connection.connect();

// to do:
// проверка куки(если отсутствует куки, перенаправляет на регистрацию)
forum.get('/main', (req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	connection.query('SELECT * FROM Forums;', (err, result) => {
		if (err) res.sendStatus(500);
		else res.json(result);
	});
});

// send json: {header, discussions: [discussion...]}
forum.get('/discussions/:forumId', upload.none(), (req, res) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	let forumId = req.params.forumId;

	forumId = Number(forumId);
	if (!forumId) {
		res.sendStatus(400);
		return;
	}

	connection.query(
		"SELECT id, header, answer_count, DATE_FORMAT(create_date, '%d %b %Y') AS create_date FROM Discussions WHERE forum_class_id = ?;",
		[forumId],
		(err, result) => {
			if (err) res.sendStatus(500);
			else {
				connection.query(
					'SELECT header FROM Forums WHERE id = ?;',
					[forumId],
					(err, result2) => {
						if (err) res.sendStatus(500);
						else
							res.json({
								header: result2[0].header,
								discussions: result
							});
					}
				);
			}
		}
	);
});

forum.get('/answers/:discussionId/:limit', upload.none(), (req, res) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	limit = req.params.limit;
	discussionId = req.params.discussionId;

	sqlcode = `
        SELECT 
            Answers.content as content, 
            DATE_FORMAT(Answers.answer_date, '%d %b %Y %H:%i:%s') as date, 
            Users.login as username,
            IF(Users.id = (SELECT author FROM Discussions WHERE id = ${discussionId}), 1, 0) AS isAuthor
        FROM Answers 
        LEFT JOIN Users ON Users.id = Answers.user_id 
        WHERE Answers.discussion_id = ${discussionId} 
        ORDER BY Answers.answer_date ASC
        LIMIT ${limit};
    `;

	connection.query(sqlcode, (err, result) => {
		if (err) {
			res.sendStatus(500);
		} else {
			connection.query(
				`SELECT header FROM Discussions WHERE id = ${discussionId} LIMIT 1;`,
				(err, result2) => {
					res.json({
						header: result2[0].header,
						discussions: result
					});
				}
			);
		}
	});
});

forum.post('/answer/:discussionId', upload.none(), (req, res) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	cookies = auth.getCookies();
	usersCookie = cookies[Object.keys(req.cookies)[0]];

	res.sendStatus(200);
	return;
});

forum.post('/create-discussion', upload.none(), (req, res) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');

	let cookies = auth.getCookies();
	let usersCookie = Object.keys(req.cookies)[0];

	if (!(usersCookie in cookies)) {
		// res.clearCookie(Object.keys(req.cookies)[0]);
		res.statusMessage = 'no cookie';
		res.sendStatus(403); // отправляем пользователя на страницу регистрации
		return;
	}

	usersCookie = cookies[usersCookie];

	let forum_class_id = req.body['forum_class_id'];
	let header = req.body['header'];
	let message = req.body['message'];
	let author = usersCookie.id;

	if (!(header && message)) {
		res.statusMessage = 'missing meaning';
		res.sendStatus(400);
		return;
	}

	sqlcode = `
        INSERT INTO Discussions (forum_class_id, header, create_date, author, create_date) 
        VALUES (?, ?, ?, NOW());
        INSERT INTO Answers (user_id, discussion_id, content, answer_date)
        VALUES (?, (SELECT MAX(id) FROM Discussions), ?, NOW());
    `;

	connection.query(sqlcode, [forum_class_id, header, author], (err) => {
		if (err) res.sendStatus(500);
		else {
			connection.query(sqlcode2, [author], (err) => {
				if (err) res.sendStatus(500);
				else {
					res.sendStatus(200);
				}
			});
		}
	});
});

module.exports = forum;
