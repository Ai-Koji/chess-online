var express = require('express');
var lesson = express.Router();
var jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { MYSQL, TOKENSECRET, DATABASENAME } = require('../../settings');
const multer = require('multer');
const upload = multer();

// connect to mysql server
const connection = mysql.createConnection({
	host: MYSQL.host,
	user: MYSQL.user,
	password: MYSQL.password,
	database: MYSQL.name
});
connection.connect();

lesson.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

lesson.get('/main', (req, res) => {
	connection.query(
		`
        SELECT 
            Lessons_blocks.id AS block_id,
            Lessons_blocks.header AS block_header, 
            Lessons.id AS lesson_id,
            Lessons.header AS lesson_header,
            Lessons.about AS lesson_about,
            Lessons.image AS lesson_image,
            Lessons.lesson_block AS lesson_block
        FROM Lessons_blocks
        INNER JOIN Lessons ON Lessons.lesson_block = Lessons_blocks.id
        `,
		(err, result) => {
			if (err) res.sendStatus(500);
			else res.json(result);
		}
	);
});

lesson.get('/lesson/:lessonId', (req, res) => {
	let lessonId = Number(req.params.lessonId)
	connection.query(
		`
		SELECT 
			header,
			game
		FROM Lessons
		WHERE id = ?;
		`, [lessonId],
		(err, result) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else res.json(result);
		}
	)

});

module.exports = lesson;
