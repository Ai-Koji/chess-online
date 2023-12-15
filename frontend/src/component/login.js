import React from 'react';
import "../styles/login-reg.css";

class Login extends React.Component {
    render () {
        return (
            <div className="container">
                <div className="form">
                    <form action="/api/login" method="POST">
                        <h1>Войти</h1>
                        <label>Логин или электронная почта</label>
                        <input name="loginOrMail"/>
                        <label>Пароль</label>
                        <input name="password"/>
                        <input type='submit' value='Войти'/>
                    </form>
                    <div className="urls">
                        <a href='/registration'>Регистрация</a>
                    </div>
                </div>
            </div>
        )       
    }
}

export default Login