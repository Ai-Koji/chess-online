var express = require('express');
var debut = express.Router();
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

debut.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

//
debut.get('/main', (req, res) => {
	connection.query(
		`
        SELECT 
            id,
            header,
            mainFEN
        FROM Debuts;
        `,
		(err, result) => {
			if (err) res.sendStatus(500);
			else res.json(result);
		}
	);
});

//
debut.get('/debut/:debutId', (req, res) => {
	let debutId = Number(req.params.debutId);
	connection.query(
		`
            SELECT *
            FROM Debuts
            WHERE id = ?
		`,
		[debutId],
		(err, result) => {
			if (err) res.sendStatus(500);
			else res.json(result);
		}
	);
});

module.exports = debut;
