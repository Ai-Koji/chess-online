import React from 'react';
import "../styles/login-reg.css";

class Reg extends React.Component {
    render () {
        return (
            <div className="container">
                <div className="form">
                    <form action="/api/registration" method="POST">
                        <h1>Регистрация</h1>
                        <label>Логин</label>
                        <input name="login"/>
                        <label>Пароль</label>
                        <input name="password"/>
                        <label>Электронная почта</label>
                        <input name="mail"/>
                        <input type='submit' value='Войти'/>
                    </form>
                    <div className="urls">
                        <a href='/login'>Авторизация</a>
                    </div>
                </div>
            </div>
        )

    }
}

export default Reg