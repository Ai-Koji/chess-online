import React from 'react';
import arrowBack from "../images/arrow-back.svg"
import "../styles/forum-page.css";

// to do:
// add server request
// add "add message" page

class ForumPage extends React.Component {
    render () {
        return (
            <div className="container">
                <div className="header">
                    <button className="back">
                        <img src={arrowBack}/>
                    </button>
                    <h1>cheeeeeess forum</h1>
                </div>
                 
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
        )
    }
}

export default ForumPage