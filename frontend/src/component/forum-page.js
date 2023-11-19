import React from 'react';
import arrowBack from "../images/arrow-back.svg"
import "../styles/forum-page.css";

// to do:
// сделать обработку запросов
// сделать кнопку "показать еще"

class ForumPage extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="header">
                    <button className="back">
                        <img src={arrowBack} />
                    </button>
                    <h1>cheeeeeess forum</h1>
                </div>
                <div className="message-list">

                    <div className="message">
                        <div className="message-header">
                            <div className="author">
                                <h3>SimonBirch</h3>
                            </div>
                            <div className="time">
                                <h3>3 дня назад</h3>
                            </div>
                        </div>
                        <div className="message-main">
                            <p>
                                I’m messing with you of course, just getting a bit tired of these threads. How do I become etc xxx
                            </p>
                        </div>
                    </div>
                    <div className="message">
                        <div className="message-header">
                            <div className="user">
                                <h3>SimonBirch</h3>
                            </div>
                            <div className="time">
                                <h3>3 дня назад</h3>
                            </div>
                        </div>
                        <div className="message-main">
                            <p>
                                I’m messing with you of course, just getting a bit tired of these threads. How do I become etc xxx
                            </p>
                        </div>
                    </div>
                </div>
                <button>Показать еще</button>
                <div className="answer-form">
                    <form action="/submit" method="post">
                        <h1>Ответить</h1>
                        <textarea id="message" name="message" rows="4" placeholder="Введите ваше сообщение" required></textarea>

                        <input type="submit" value="Отправить" />
                    </form>
                </div>
            </div>
        )
    }
}

export default ForumPage