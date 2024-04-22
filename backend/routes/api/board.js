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
        FROM Boards WHERE id = ?;
        `,
        [boardId],
		(err, result1) => {
            let game;
			if (err) game = [];
			else {
                if (result1.length == 0) game = [];
                else {
                    result1 = result1[0];
                    if (result1.user_id == user.id) game = result1
                    else if (!result1.is_open) game = [];
                    else game = result1
                }

                connection.query(
                    `
                    SELECT
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

                        res.json({game: game, savedGames: savedGames})
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
            }
            else { // если пользователь авторизован, то продолжаем
                connection.query(`
                    SELECT user_id 
                    FROM Boards
                    WHERE Boards.id = ?;
                `,
                [boardId],
                (err, result1) => {
                        if(err) res.sendStatus(500);
                        else if (result1[0].user_id = user.id){
                            res.statusMessage = 'Forbidden'
                            res.sendStatus(403);
                        }
                        else {
                            connection.query(`
                                INSERT INTO Boards
                                    (user_id, header, mainFen, game, is_open)
                                VALUES
                                    (?, ?, ?, ?, ?);
                            `, 
                            [user.id, header, mainFen, game, isOpen],
                            (err) => {
                                    if (err) res.sendStatus(500);
                                    else res.sendStatus(200);
                                }
                            );
                        }
                    }
                );
            };
        } else { // добавляем партию в бд
            let user = isLogin(req, res);
            if (!user) {
                console.log('tes')
                res.statusMessage = 'Not auth';
                res.sendStatus(403);
            } // если пользователь не авторизован
            else { // если пользователь авторизован, то продолжаем
                connection.query(`
                    INSERT INTO Boards
                        (user_id, header, mainFen, game, is_open)
                    VALUES
                        (?, ?, ?, ?, ?);
                `, 
                [user.id, header, mainFen, game, isOpen],
                (err) => {
                        if (err) res.sendStatus(500);
                        else res.sendStatus(200);
                    }
                );
            };
        };
    } catch (err) {
        console.log(err)
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
