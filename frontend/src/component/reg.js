import React from 'react';
import "../styles/login-reg.css";

class Reg extends React.Component {
    register(event) {
        event.preventDefault(); 

        let form = document.getElementById("form-login");
        let formData = new FormData(form);
        
        fetch('http://127.0.0.1:3000/api/auth/login', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Произошла ошибка при отправке запроса:', error);
        });
    }
    render () {
        return (
            <div className="container">
                <div className="form">
                    <form action="/api/auth/register" method="post">
                        <h1>Регистрация</h1>
                        <label>Логин</label>
                        <input name="login" />
                        <label>Пароль</label>
                        <input name="password" />
                        <label>Электронная почта</label>
                        <input name="email" />
                        <input type="button" onClick={this.register} value="зарегистрироваться"/>
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