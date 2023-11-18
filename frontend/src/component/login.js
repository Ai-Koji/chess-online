import React from 'react';
import "../styles/login-reg.css";

class Login extends React.Component {
    render () {
        return (
            <div className="container">
                <div className="form">
                    <form >
                        <h1>Войти</h1>
                        <label>Имя пользователя</label>
                        <input />
                        <label>Логин или электронная почта</label>
                        <input />
                        <label>Пароль</label>
                        <input />
                        <input type='submit' placeholder='Войти'/>
                    </form>
                    <div className="urls">
                        <a href=''>Регистрация</a>
                    </div>
                </div>
            </div>
        )       
    }
}

export default Login