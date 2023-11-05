import React, { Component } from 'react';
import "../styles/forum.css";

class Forum extends React.Component {
    render() {
        return (
            <div className="container" style={{display: "block"}}>
                <div className="header">
                    <h1>cheeeeeess forum</h1>
                    <input placeholder="Поиск" className="search-input" />
                </div>
                <table className="categories">
                    <thead>
                        <tr>
                            <th className="subject"></th>
                            <th>Темы</th>
                            <th>сообщения</th>
                            <th>последнее сообщение</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <a href="">
                                    <h1>General Chess Discussion</h1>
                                    <p>The place to discuss general chess topics</p>
                                </a>
                            </td>
                            <td>65 097</td>
                            <td>582 657</td>
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
                                    <h1>General Chess Discussion</h1>
                                    <p>The place to discuss general chess topics</p>
                                </a>
                            </td>
                            <td>65 097</td>
                            <td>582 657</td>
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
                                    <h1>General Chess Discussion</h1>
                                    <p>The place to discuss general chess topics</p>
                                </a>
                            </td>
                            <td>65 097</td>
                            <td>582 657</td>
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
                                    <h1>General Chess Discussion</h1>
                                    <p>The place to discuss general chess topics</p>
                                </a>
                            </td>
                            <td>65 097</td>
                            <td>582 657</td>
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

export default Forum