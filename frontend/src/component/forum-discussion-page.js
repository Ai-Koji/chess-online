import React from 'react';
import arrowBack from '../images/arrow-back.svg';
import '../styles/forum-page.css';

// to do:
// сделать обработку запросов

class ForumPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 0,
            header: "",
            answers: null
        };
    }

    answers = () => {
        this.state.limit += 10
        let bodyAnswers = [];
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const lastNumber = parseInt(parts[parts.length - 1]);
        fetch(`http://127.0.0.1:3000/api/forum/answers/${lastNumber}/${this.state.limit}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                for (let index = 0; index < result.discussions.length; index++) {
                    bodyAnswers.push(
                        <div className="message">
                            <div className="message-header">
                                <div className={result.discussions[index].isAuthor ? "author": "user"}>
                                    <h3>{result.discussions[index].username}</h3>
                                </div>
                                <div className="time">
                                    <h3>{result.discussions[index].date}</h3>
                                </div>
                            </div>
                            <div className="message-main">
                                <p>
                                    {result.discussions[index].content}
                                </p>
                            </div>
                        </div>
                    );
                }
                this.setState({header: result.header, answers: bodyAnswers})
            })
            .catch((result) => {
                console.log(result);
            });
    };

    componentDidMount() {
        this.answers();
    }

    render() {
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const preLastNumber = parseInt(parts[parts.length - 2]);
        return (
            <div className="container">
                <div className="header">
                    <a href= {`/forum/discussions/${ preLastNumber }`} className="back">
                        <img src={arrowBack} />
                    </a>
                    <h1>{ this.state.header }</h1>
                </div>
                <div className="message-list">
                    { this.state.answers }
                </div>
                <button className="show-more" onClick={this.answers}>Показать еще</button>
                <div className="answer-form">
                    <form action="/submit" method="post">
                        <h1>Ответить</h1>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            placeholder="Введите ваше сообщение"
                            required
                        ></textarea>

                        <input type="submit" value="Отправить" />
                    </form>
                </div>
            </div>
        );
    }
}

export default ForumPage;
