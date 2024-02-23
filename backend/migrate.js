const mysql = require('mysql');
const { MYSQL } = require('./settings');

// connect to mysql server
const connection = mysql.createConnection({
	host: MYSQL.host,
	user: MYSQL.user,
	password: MYSQL.password
});

connection.connect(function (err) {
	if (err) {
		console.error('error to connect: ' + err.stack);
		return;
	}
	console.log('connect to server is succesfull');
});

// create DB
connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL.name}`, function (err) {
	if (err) {
		console.error('error to create DB: ' + err.stack);
		return;
	}
	console.log('База данных "mydatabase" успешно создана или уже существует');
});

// use DB
connection.query('USE chess_online', function (err) {
	if (err) {
		console.error('error to use db: ' + err.stack);
		return;
	}
	console.log('USE db');
});

// create tables
console.log('create tables');
sqlCode = [
	// User
	`CREATE TABLE IF NOT EXISTS Users (
		id INT AUTO_INCREMENT PRIMARY KEY,
		login VARCHAR(255) NOT NULL,
		password TEXT NOT NULL,
		email VARCHAR(255) NOT NULL
  	);`,
	// Forum
	`CREATE TABLE IF NOT EXISTS Forums (
		id INT AUTO_INCREMENT PRIMARY KEY,
		header TEXT NOT NULL,
		about TEXT NOT NULL,
		topic_count INT DEFAULT 0,
		messages_count INT DEFAULT 0 
  	);`,
	// Discussion
	`CREATE TABLE IF NOT EXISTS Discussions (
		id INT AUTO_INCREMENT PRIMARY KEY,
		forum_class_id INT NOT NULL,
		author INT NOT NULL,
		header TEXT,
		answer_count INT,
		create_date DATETIME,
		FOREIGN KEY (author) REFERENCES Users (id),
		FOREIGN KEY (forum_class_id) REFERENCES Forums (id)
  	);`,
	// Answer
	`CREATE TABLE IF NOT EXISTS Answers (
		id INT AUTO_INCREMENT PRIMARY KEY,
		user_id INT NOT NULL,
		discussion_id INT NOT NULL,
		content TEXT NOT NULL,
		answer_date DATETIME,
		FOREIGN KEY (user_id) REFERENCES Users (id),
		FOREIGN KEY (discussion_id) REFERENCES Discussions (id)
  	);`,
	// image
	`CREATE TABLE IF NOT EXISTS Image (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255),
		URL TEXT
	);`,
	// Pdf
	`CREATE TABLE IF NOT EXISTS Pdf (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255),
		URL TEXT
	);`,
	// Book_class
	`CREATE TABLE IF NOT EXISTS Book_class (
		id INT AUTO_INCREMENT PRIMARY KEY,
		header VARCHAR(50)
	);`,
	// Books
	`CREATE TABLE IF NOT EXISTS Books (
		id INT AUTO_INCREMENT PRIMARY KEY,
		book_class_id INT NOT NULL,
		title VARCHAR(50),
		cost INT DEFAULT NULL,
		author VARCHAR(50) DEFAULT "",
		image INT,
		aboutBook TEXT,
		pdf INT,
		FOREIGN KEY (book_class_id) REFERENCES Book_class (id),
		FOREIGN KEY (image) REFERENCES Image (id),
		FOREIGN KEY (pdf) REFERENCES  Pdf (id)
	);`
];

for (index = 0; index < sqlCode.length; index++) {
	connection.query(sqlCode[index], function (err) {
		if (err) {
			console.error('error to create table: ' + err.stack);
			return;
		}
	});
}

console.log('created tables:');
connection.query('SHOW TABLES;', function (err, result) {
	if (err) {
		console.error('error to connect: ' + err.stack);
		return;
	}
	console.log('result: ', result);
});

connection.end();
