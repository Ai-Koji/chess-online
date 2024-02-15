import React from 'react';
import "../styles/forum-create-topic.css";
import arrowBack from "../images/arrow-back.svg"

// to do:
// добавить обработку запросов

class CreateTopic extends React.Component{
    render () {
        return (
            <div className="container">
                <div className="header">
                    <button className="back">
                        <img src={arrowBack} />
                    </button>
                    <h1>General Chess Discussion</h1>
                </div>
                <hr />
                <div className="answer-form">
                    <form action="/submit" method="post">
                        <h1>Создать тему</h1>

                        <label>Заголовок темы</label>
                        <input type="text" />

                        <label>Сообщение</label>
                        <textarea id="message" name="message" rows="4" required></textarea>

                        <input type="submit" value="СОЗДАТЬ ТЕМУ" />
                    </form>
                </div>
                
            </div>
            )
    }
}

export default CreateTopic