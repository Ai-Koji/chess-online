var express = require('express');
var library = express.Router();
const mysql = require('mysql');
const { MYSQL } = require('../../settings');
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

library.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	let usersCookie = Object.keys(req.cookies);
	if (usersCookie.length >= 1 && !(usersCookie[0] in cookies))
		res.clearCookie(usersCookie[0]);
	next();
});

library.get('/main', upload.none(), (req, res) => {
    let books = [];
    let isError = false;

    connection.query('SELECT id, header FROM Book_class;', (err, result) => {
        if (err) {
            isError = true;
            res.sendStatus(500);
        } else {
            let count = 0;

			sqlCode = `
                SELECT 
                    Books.id AS id,
                    Books.title AS title,
                    Books.author AS author,
                    Images.URL AS imageUrl
                FROM 
                    Books
                INNER JOIN 
                    Images ON Books.image = Images.id
                WHERE 
                    Books.book_class_id = ?;
			`
            result.forEach((item) => {
                connection.query(
                    sqlCode,
                    [item.id],
                    (err, result2) => {
                        count++;

                        if (err) {
                            console.log(err)
							res.sendStatus(500);
                            isError = true;
                        } else {
                            books.push({
                                header: item.header,
                                bookList: result2
                            });
                        }

                        if (count === result.length) {
                            if (!isError) {
                                res.json(books);
                            }
                        }
                    }
                );
            });
        }
    });
});

module.exports = library;
