import React, { useState } from 'react';
import "../styles/board.css";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";


function clearBoard() {
    // here will be clearBoard function
}

function SavedGames(prop) {
    // here will be render board
}

function History (prop){
    let history = prop.history;
    let elements = [];

    let moveCount = 0;

    console.log(history)

    for (let index = 0; index <= history.length; index += 2) {
        if (index % 2 == 0) {
            moveCount++;
        }

        elements.push(
            (
                <tr>
                    <td>{moveCount}</td>
                    <td>{history[index]}</td>
                    <td>{history[index + 1]}</td>
                </tr>
            )
        )
    }



    let dom = (
        <tbody>
            {elements}
        </tbody>
    )

    return dom
}

// draw board
function Board() {
    const [game, setGame] = useState(new Chess());
    const [history, setGameHistory] = useState(game.history());

    function makeAMove(move) {
        const gameCopy = new Chess(game.fen());
        gameCopy.move(move);
        setGame(gameCopy);

        let updatedHistory = history
        updatedHistory.push(gameCopy.history()[0])

        setGameHistory(updatedHistory);
    }

    function onDrop(sourceSquare, targetSquare) {
        // try - need for legal moves
        try {
            const move = makeAMove({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", 
            });
        }
        catch {
        }
    }


    return (
        <section className="container">
            <section className="board-name">
                <b>
                    <input placeholder="Название партии" type="text" id="board-name" />
                </b>
            </section>
            <section className="chess-game">
                <div className="chess-board">
                    <div className="active-move">
                        <div id="active-marker" style={{ bottom: 0, transition: "bottom 1s" }}></div>
                    </div>
                    <Chessboard className="chesssboard" style={{height: "40vh" }} position={game.fen()} onPieceDrop={onDrop} />

                </div>
                <div className="history">
                    <table id="history-table">
                        <History id="history-table" history={history}/>
                    </table>
                </div>
            </section>
            <section className="options">
                <button id="delete-game">Удалить</button>
                <button id="save-game">Сохранить</button>
                <button id="clear-board">Очистить доску</button>
                <button id="open-close-for-share">Скрыть от всех/Открыть для всех</button>
                <button id="share-game">Поделиться</button>
            </section>
            <section className="save">
                <h1>Сохраненные партии</h1>
                <ul className="save-grid">
                    
                </ul>
            </section>
        </section>
    );
}


export default Board;