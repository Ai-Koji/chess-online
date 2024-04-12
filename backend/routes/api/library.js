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
                LEFT JOIN 
                    Images ON Books.image_id = Images.id
                WHERE 
                    Books.book_class_id = ?;
			`;
			result.forEach((item) => {
				connection.query(sqlCode, [item.id], (err, result2) => {
					count++;

					if (err) {
						res.sendStatus(500);
						isError = true;
					} else 
						books.push({
							header: item.header,
							bookList: result2
						});

					if (count === result.length) 
						if (!isError)
							res.json(books);
				});
			});
		}
	});
});

library.get('/book/:bookId', upload.none(), (req, res) => {
	let bookId = Number(req.params.bookId);

	sqlCode = `
        SELECT 
            Books.title AS title,
            Books.author AS author,
            Books.about AS about,
            Books.where_to_buy AS whereToBuy,
            Images.URL AS imageUrl,
			Pdf.URL AS pdfUrl
        FROM 
            Books
		LEFT JOIN 
            Images ON Books.image_id = Images.id
        LEFT JOIN 
			Pdf ON Books.pdf_id = Pdf.id
        WHERE 
            Books.id = ?;
    `;
	connection.query(sqlCode, [bookId], (err, result) => {
		if (err) res.sendStatus(500);
		else res.json(result);
	});
});
module.exports = library;
