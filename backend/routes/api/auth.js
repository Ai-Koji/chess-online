var express = require('express');
var auth = express.Router();
var jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { MYSQL } = require('../../settings');
const { emit } = require('nodemon');
const multer = require('multer');
const upload = multer();



const accessTokenSecret = 'MkgmXSSxpOTgpNLGNNueyQHzZmHbgQiCOGAMKOtAmvcqcYUYCJTeWKWqBrbbGatkYLiIRvRimuvAOnltiLSvzFyPpakmxHinYSwy';
// {token: info(login, password, email)}
cookies = {};

// connect to mysql server
const connection = mysql.createConnection({
  host: MYSQL.host,
  user: MYSQL.user,
  password: MYSQL.password,
  database: 'chess_online'
});
connection.connect();

// register page
auth.post('/register', upload.none(), (req, res, next) => {
  login = req.body["login"];
  password = req.body["password"];
  email = req.body["email"];

  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Headers', 'Content-Type');

  //check info
  if (!(login.length && password.length && email.length)) {
    res.statusMessage = "missing meaning"
    res.sendStatus(400);
    return
  } else if (Object.keys(req.cookies).length > 0) {
    if (!(Object.keys(req.cookies)[0] in Object.keys(cookies))) {
      let token = req.cookies;
      delete cookies[token];
      res.clearCookie(token);
    } else {
      res.sendStatus(200)
      return; // If the user has cookies, the user is redirected to the home page 
    }
  }

  // Checking the login for universality
  const checkLogin = (login) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT 1 FROM Users WHERE login = ?", [login], function (err, results) {
        if (err) {
          reject(err);
        }
        if (results.length > 0)
          resolve(true);
        else
          resolve(false);
      });
    });
  }

  const checkEmail = (email) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT 1 FROM Users WHERE email = ?", [email], function (err, results) {
        if (err) {
          reject(err);
        }
        if (results.length > 0)
          resolve(true);
        else
          resolve(false);
      });
    });
  }

  checkLogin(login)
    .then((isUse) => {
      if (isUse) {
        res.statusMessage = "login is already in use"
        res.sendStatus(400);
        return;
      }
      checkEmail(email)
        .then((isUse) => {
          if (isUse) {
            res.statusMessage = "email is already in use"
            res.sendStatus(400);
            return;
          }

          //save info to db
          sqlCode = 'INSERT INTO Users (login, password, email) VALUES (?, ?, ?)'
          values = [login, password, email]
          connection.query(sqlCode, values)

          // create and save token
          let accessToken = jwt.sign({ login: login, email: email }, accessTokenSecret);
          cookies[accessToken] = {
            login: login,
            password: password,
            email: email
          };

          res.cookie(accessToken);
          res.sendStatus(200);
          return;
        })
        .catch((error) => {
          res.sendStatus(500);
        })
    })
    .catch((error) => {
      res.sendStatus(500);
    })
});

// login page
auth.post('/login', upload.none(), (req, res, next) => {
  loginOrMail = req.body["loginOrMail"];
  password = req.body["password"];

  if (!(loginOrMail.length && password.length)) {
    res.sendStatus(400);
    return;
  } else if (Object.keys(req.cookies).length > 0) {
    if (!(Object.keys(req.cookies)[0] in Object.keys(cookies))) {
      let token = req.cookies;
      delete cookies[token];
      res.clearCookie(token);
    } else {
      res.sendStatus(200)
      return; // If the user has cookies, the user is redirected to the home page 
    }
  }

  // check info
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      connection.query("SELECT * FROM Users WHERE ? IN (email, login) AND password = ? LIMIT 1",
        [loginOrMail, password], function (err, result) {
          if (err) 
            reject(err);
          if ((result[0]["login"] == loginOrMail || result[0]["email"] == loginOrMail) && result[0]["password"] == password)
            resolve(result);
          else
            resolve(401);
        })
    })
  })

  promise.then((value) => {
    if (value == 401)
      res.sendStatus(401);
    else {
      // создаем и сохраняем токен
      let info = { login: value[0]["login"], email: value[0]["email"], password: value[0]["password"] }
      let accessToken = jwt.sign({ login: info.login, email: info.email }, accessTokenSecret);
      cookies[accessToken] = {
        login: info.login,
        password: info.password,
        email: info.email
      };

      res.cookie(accessToken);
      res.sendStatus(200);
    }
  });
  promise.catch((value) => {
    res.sendStatus(500);
  })
})

// logout
auth.post('/logout', function (req, res, next) {
  // Processing cookie
  let token = req.cookies;

  delete cookies[token];
  res.clearCookie(token);
  res.sendStatus(200);
})

module.exports = auth;