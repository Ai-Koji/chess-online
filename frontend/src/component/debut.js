import React, { Component } from 'react';
import "../styles/debut.css";
import { Chessboard } from "react-chessboard";
import arrowPrev from "../images/skip-prev1.svg"
import arrowNext from "../images/skip-next1.svg"
import arrowPrev2 from "../images/skip-prev2.svg"
import arrowNext2 from "../images/skip-next2.svg"


class Debut extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container" style={{display: "block"}}>
                <h1>Итальянска партия</h1>
                <div className="grid-container">
                    <section className="board chessboard">
                        <Chessboard />
                    </section>
                    <section className="about-game">
                        <div className="game">
                            <table className="main-moves">
                                <tbody>
                                    <tr>
                                        <index>1</index>
                                        <move>e4</move>
                                        <move>e5</move>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="description">
                                <p>
                                    тут будет описание
                                </p>
                            </div>
                            <div className="other-moves">
                                <index>1.</index>
                                <move>e4</move>
                                <move>e5</move>
                                <index>1.</index>
                                <move>e4</move>
                                <move>e5</move>
                                отдельные ходы
                            </div>

                            <table className="main-moves">
                                <tbody>
                                    <tr>
                                        <index>1</index>
                                        <move>e4</move>
                                        <move>e5</move>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="buttons">
                            <button><img src={arrowPrev2} /></button>
                            <button><img src={arrowPrev} /></button>
                            <button><img src={arrowNext} /></button>
                            <button><img src={arrowNext2} /></button>
                        </div>
                    </section>
                </div>
                <h1 className="recomendation-header">Рекомендуем</h1>
                <ul id="debut-items" className="debut-grid">
                    <li className="debut-item">
                        <a href="">
                            <h2>fds</h2>
                            <div className="debut-board">
                                <Chessboard/>
                            </div>
                        </a>
                    </li>
                    <li className="debut-item">
                        <a href="">
                            <h2>fds</h2>
                            <div className="debut-board">
                                <Chessboard/>
                            </div>
                        </a>
                    </li>
                    <li className="debut-item">
                        <a href="">
                            <h2>fds</h2>
                            <div className="debut-board">
                                <Chessboard/>
                            </div>
                        </a>
                    </li>
                    <li className="debut-item">
                        <a href="">
                            <h2>fds</h2>
                            <div className="debut-board">
                                <Chessboard/>
                            </div>
                        </a>
                    </li>
                    <li className="debut-item">
                        <a href="">
                            <h2>fds</h2>
                            <div className="debut-board">
                                <Chessboard/>
                            </div>
                        </a>
                    </li>
                    <li className="debut-item">
                        <a href="">
                            <h2>fds</h2>
                            <div className="debut-board">
                                <Chessboard/>
                            </div>
                        </a>
                    </li>
                    <li className="debut-item">
                        <a href="">
                            <h2>fds</h2>
                            <div className="debut-board">
                                <Chessboard/>
                            </div>
                        </a>
                    </li>
                    <li className="debut-item">
                        <a href="">
                            <h2>fds</h2>
                            <div className="debut-board">
                                <Chessboard/>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Debut;