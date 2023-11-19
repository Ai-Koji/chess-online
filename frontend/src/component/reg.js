import React from 'react';
import "../styles/login-reg.css";

class Reg extends React.Component {
    render () {
        return (
            <div className="container">
                <div className="form">
                    <form >
                        <h1>Регистрация</h1>
                        <label>Логин</label>
                        <input />
                        <label>Пароль</label>
                        <input />
                        <label>Электронная почта</label>
                        <input />
                        <input type='submit' placeholder='Войти'/>
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