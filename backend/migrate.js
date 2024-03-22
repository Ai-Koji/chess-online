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
	console.log('База данных успешно создана или уже существует');
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
	// Users
	`CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        login VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        email VARCHAR(255) NOT NULL
    );`,
	// Pdf
	`CREATE TABLE IF NOT EXISTS Pdf (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        URL TEXT
    );`,
	// Images
	`CREATE TABLE IF NOT EXISTS Images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        URL TEXT
    );`,
	// Forums
	`CREATE TABLE IF NOT EXISTS Forums (
        id INT AUTO_INCREMENT PRIMARY KEY,
        header TEXT NOT NULL,
        about TEXT NOT NULL,
        topic_count INT DEFAULT 0,
        messages_count INT DEFAULT 0 
    );`,
	// Discussions
	`CREATE TABLE IF NOT EXISTS Discussions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        header TEXT,
        forum_id INT NOT NULL,
        user_id INT NOT NULL,
        answer_count INT DEFAULT 0,
        create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (forum_id) REFERENCES Forums (id)
    );`,
	// Answers
	`CREATE TABLE IF NOT EXISTS Answers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        discussion_id INT NOT NULL,
        content TEXT NOT NULL,
        answer_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (discussion_id) REFERENCES Discussions (id)
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
        author VARCHAR(50) DEFAULT "",
        about TEXT DEFAULT NULL,
        image_id INT DEFAULT NULL,
        pdf_id INT DEFAULT NULL,
        where_to_buy TEXT DEFAULT NULL,
        FOREIGN KEY (book_class_id) REFERENCES Book_class (id),
        FOREIGN KEY (image_id) REFERENCES Images (id),
        FOREIGN KEY (pdf_id) REFERENCES  Pdf (id)
    );`,
	// Lessons_blocks
	`CREATE TABLE IF NOT EXISTS Lessons_blocks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        header VARCHAR(255)
    );`,
	// Lessons
	`CREATE TABLE IF NOT EXISTS Lessons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        header VARCHAR(255) IS NOT NULL,
        about TEXT,
        game TEXT,
        lesson_block_id INT IS NOT NULL,
        image_id INT DEFAULT NULL, 
        FOREIGN KEY (image_id) REFERENCES Images (id),
        FOREIGN KEY (lesson_block_id) REFERENCES Lessons_blocks (id)
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
