var express = require('express');
var lesson = express.Router();
const mysql = require('mysql');
const { MYSQL } = require('../../settings');

// connect to mysql server
const connection = mysql.createConnection({
	host: MYSQL.host,
	user: MYSQL.user,
	password: MYSQL.password,
	database: MYSQL.name
});
connection.connect();

lesson.use((_, res, next) => {
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
            Lessons.image_id AS lesson_image,
            Lessons.lesson_block_id AS lesson_block
        FROM Lessons_blocks
        INNER JOIN Lessons ON Lessons.lesson_block_id = Lessons_blocks.id
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
			if (err) res.sendStatus(500);
			else res.json(result);
		}
	)

});

module.exports = lesson;
