import React from 'react';

export default class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: null
        };
    }
    render() {
        return (
            <div className="question-card"></div>
        );
    }
}

export default QuestionCard;
