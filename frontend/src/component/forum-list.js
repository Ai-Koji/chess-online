import React from 'react';
import "../styles/forum-list.css";
import arrowBack from "../images/arrow-back.svg"

// to do:
// добавить запросы на сервер
// добавить "создание сообщения" 

class ForumList extends React.Component {
    render() {
        return (
            <div className="container" style={{display: "block"}}>
                <div className="header">
                    <button className="back">
                        <img src={arrowBack}/>
                    </button>
                    <h1>cheeeeeess forum</h1>
                    <button className="create">СОЗДАТЬ НОВУЮ ТЕМУ</button>
                </div>
                <table className="list">
                    <thead>
                        <tr>
                            <th className="subject"></th>
                            <th className="count">Ответы</th>
                            <th className="author">последнее сообщение</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <a href="">
                                    <h3>Disconnection cause game lost in few seconds but no move let me wait all the time</h3>
                                </a>
                            </td>
                            <td>0</td>
                            <td>
                                <a href="">
                                    5 минут назад
                                    <div className="author">
                                        WindyPawns
                                    </div>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="">
                                    <h3>Games</h3>
                                </a>
                            </td>
                            <td>0</td>
                            <td>
                                <a href="">
                                    5 минут назад
                                    <div className="author">
                                        WindyPawns
                                    </div>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>        
            )
    }
}

export default ForumList