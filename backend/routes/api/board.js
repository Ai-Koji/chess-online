var express = require('express');
var board = express.Router();
const mysql = require('mysql');
const { MYSQL } = require('../../settings');
var auth = require('./auth');

// connect to mysql server
const connection = mysql.createConnection({
	host: MYSQL.host,
	user: MYSQL.user,
	password: MYSQL.password,
	database: MYSQL.name
});
connection.connect();

board.use((_, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Получить информации о партии 
board.get('/:boardId', (req, res) => {
	let boardId = Number(req.params.boardId);

    // проверяем пользователя на авторизацию:
    user = isLogin(req, res) 
    
	connection.query(
		`
        SELECT *
        FROM 
            Boards WHERE id = ?;
        `,
        [boardId],
		(err, result1) => {
            let game;
			if (err) game = [];
			else {
                if (result1.length == 0) game = [];
                else {
                    result1 = result1[0];
                    if (result1.user_id == user.id) {game = result1}
                    else if (!result1.is_open) game = []
                    else game = result1
                }

                connection.query(
                    `
                    SELECT
                        id,
                        user_id,
                        header,
                        mainFen
                    FROM
                        Boards 
                    WHERE user_id = ?;
                    `, 
                    [user.id], 
                    (err, result2) => {
                        let savedGames;
                        if (err) savedGames = [];
                        else savedGames = result2;

                        res.json({game: game, savedGames: savedGames, isAuthor: (boardId == 0) ? 1 : result1.user_id == user.id})
                    }
                );
            };
		}
	);
});

// Обновить/сохранить партию
board.post('/update-add/:boardId/', (req, res) => {
    let boardId = Number(req.params.boardId);

    try {
        let header = req.body.header;
        let mainFen = req.body.mainFen;
        let game = req.body.game;
        let isOpen = req.body.isOpen;

        if (boardId) { // если boardId != 0, то значит обновляем партию в бд
            let user = isLogin(req, res);
            if (!user) { // если пользователь не авторизован
                res.statusMessage = 'Not auth'
                res.sendStatus(403)
            } else { // если пользователь авторизован, то продолжаем
                let id = req.body.id; // получаем id партии
                connection.query(`
                    SELECT user_id 
                    FROM Boards
                    WHERE Boards.id = ?;
                `,
                [boardId],
                (err, result1) => {
                        if (err) res.sendStatus(500);
                        else if (result1[0].user_id != user.id) {
                            res.statusMessage = 'Forbidden'
                            res.sendStatus(403);
                        } else {
                            connection.query(`
                                UPDATE Boards
                                SET 
                                    header = ?, 
                                    mainFen = ?, 
                                    game = ?, 
                                    is_open = ?
                                WHERE id = ?;
                            `, 
                            [header ? header : "", mainFen, game, isOpen, id],
                            (err) => {
                                if (err) res.sendStatus(500);
                                else res.status(200).json({ id: id });
                            });
                        }
                    });
            };
        } else { // добавляем партию в бд
            let user = isLogin(req, res);
            if (!user) {
                res.statusMessage = 'Not auth';
                res.sendStatus(403);
            } else { // если пользователь авторизован, то продолжаем
                connection.query(`
                    INSERT INTO Boards
                        (user_id, header, mainFen, game, is_open)
                    VALUES
                        (?, ?, ?, ?, ?);
                `, 
                [user.id, header ? header : "", mainFen, game, isOpen],
                (err, result) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.status(200).json({ id: result.insertId });
                    }
                });
            };
        };
    } catch (err) {
        res.sendStatus(500);
    }
});


// Удалить партию
board.delete('/delete/:boardId/', (req, res) => {
	let boardId = Number(req.params.boardId);

    try {
        if (boardId) { // если boardId != 0, то значит обновляем партию в бд
            let user = isLogin(req, res);
            if (!user) { // если пользователь не авторизован
                res.statusMessage = 'Not auth';
                res.sendStatus(403);
            }
            else { // если пользователь авторизован, то продолжаем
                let id = req.body.id; // получаем id партии
                connection.query(`
                    SELECT user_id 
                    FROM Boards
                    WHERE Boards.id = ?;
                `,
                [boardId],
                (err, result1) => {
                        if(err) res.sendStatus(500);
                        else if (result1[0].user_id != user.id)
                            res.sendStatus(403);
                        else {
                            connection.query(`
                                DELETE FROM Boards WHERE id = ?;
                            `, 
                            [boardId],
                            (err) => {
                                    if (err) res.sendStatus(500);
                                    else res.sendStatus(200);
                                }
                            );
                        }
                    }
                );
            };
        } else  // добавляем партию в бд
            res.sendStatus(400);
    } catch (err) {
        res.sendStatus(500);
    }
});

// проверка на авторизацию
function isLogin (req, res) {
	let usersCookie = Object.keys(req.cookies);
	res.set('Cache-Control', 'no-store');

    let cookies = auth.getCookies();
    
	if (usersCookie.length >= 1) {
		if (usersCookie[0] in cookies)
            return cookies[usersCookie[0]];
		else 
            return false;
	} else
        return false;
};


module.exports = board;