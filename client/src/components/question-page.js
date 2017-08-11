import React from 'react';
import * as Cookies from 'js-cookie';
import './question-page.css';

export default class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: 0,
            value:''
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
    handleSubmit(e){
        e.preventDefault();
        console.log("What is e",this.state.value);
        if(this.state.value===this.state.questions[this.state.currentQuestion].answer){
            alert("correct!");
        }
        else{
            alert("incorrect");
        }
        this.setState({
            currentQuestion: this.state.currentQuestion+1,
            value:''
        })
    }
    // handleAnswer(e){
    //         this.setState({value: e.target.value});
    //         console.log(e);


    //     }

    render() {
        // const questions = this.state.questions.map((question, index) =>
        //     <li key={index}>{question}</li>
        // );
        // console.log("This is questions:",{questions});
        // console.log("This is state",this.state);
        // console.log("This is state.questions",this.state.questions);
        // console.log("This is state.questions[0]",this.state.questions[0]);
        // var result = objArray.map(function(a) {return a.foo;});
        // console.log("This is the answer!",this.state.questions[this.state.currentQuestion]);
        // console.log("This is state.questions",this.state.questions);
        // const questionsAnswers=this.state.questions;
        // console.log("This is questionsAnswers",questionsAnswers);
        // let englishTranslation=questionsAnswers.map(function(questionValue){return questionValue.question});
        // console.log("This is englishTranslation",englishTranslation);
        // console.log("This is the first index?",englishTranslation[0]);
        // console.log("This is currentQuestion",englishTranslation[this.state.currentQuestion]);
        // let danishWord=questionsAnswers.map(function(answerValue){return answerValue.answer});
        // console.log("This is Danish word",danishWord);
        // console.log("This is Danish with currentQuestion",danishWord[this.state.currentQuestion]);

        //this.handleAnswer(e)
        if(this.state.questions.length===0){
            return (
                <div>Loading!</div>
            );
        }

        return (
            // <ul className="question-list">
            //     {questions}
            // </ul>
            <div className='questions-page'>
                 <div className='english-question-here'>{this.state.questions[this.state.currentQuestion].question}</div> 
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <input type='text' placeholder='Enter in Danish here!' value={this.state.value} onChange={(e) => this.setState({value:e.target.value})}></input>
                    <button type='submit'>Submit</button>
                    
                </form>
            </div>
        );
    }
}
