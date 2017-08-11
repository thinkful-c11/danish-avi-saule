import React from 'react';
import {connect} from 'react-redux';
import {correctModal} from '../actions';
import './correct-modal.css';

export class CorrectModal extends React.Component {
    hide(event) {
        event.preventDefault();
        this.props.dispatch(correctModal());
    }
    render() {
        return (
           <div className="correctModal">
            <div className="content">
                <h3>Your answer is correct!</h3>
                <div className="close-modal">
                    <a className="close" id="gotIt" href="#" onClick={e => this.hide(e)}>Next!</a>
                </div>
            </div>
        </div>
        );
    }
}
export default connect()(CorrectModal);