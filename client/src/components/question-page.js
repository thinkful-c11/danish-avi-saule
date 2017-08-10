import React from 'react';
import * as Cookies from 'js-cookie';
import './question-page.css';

export default class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(questions =>
            this.setState({
                questions
            })
        );
    }

    render() {
        const questions = this.state.questions.map((question, index) =>
            <li key={index}>{question}</li>
        );
        // console.log("This is questions:",{questions});
        // console.log("This is state",this.state);
        // console.log("This is state.questions",this.state.questions);
        // console.log("This is state.questions[0]",this.state.questions[0]);
        // var result = objArray.map(function(a) {return a.foo;});
        const questionsAnswers=this.state.questions;
        console.log("This is questionsAnswers",questionsAnswers);
        let englishTranslation=questionsAnswers.map(function(questionValue){return questionValue.question});
        console.log("This is englishTranslation",englishTranslation);
        console.log("This is the first index?",englishTranslation[0]);

        return (
            // <ul className="question-list">
            //     {questions}
            // </ul>
            <div className='questions-page'>
                <div class='english-question-here'>{englishTranslation[0]}</div>
                <form>
                    {questions}
                    <input type='text' placeholder='Type in the English translation'></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}
