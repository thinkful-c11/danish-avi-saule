import React from 'react';
import * as Cookies from 'js-cookie';
import './css/question-page.css';
//  ______________________
// |                      |
// |     QUESTIONPAGE     |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
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
        if(this.state.value===this.state.questions[this.state.currentQuestion].answer){
            alert("correct!");
        }
        else{
            alert("incorrect");
        }
        this.setState({
            //This increments to the next object holding the question/answer
            currentQuestion: this.state.currentQuestion+1,
            //Clear out the input field
            value:''
        })
    }
    render() {
        if(this.state.questions.length===0){
            //When the Virtual DOM loads prior to the actual DOM
            return (
                <div>Loading!</div>
            );
        }
        return (
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
