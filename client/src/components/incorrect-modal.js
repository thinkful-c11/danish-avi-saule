import React from 'react';
import {connect} from 'react-redux';
import {incorrectModal} from '../actions';
import './incorrect-modal.css';

export class IncorrectModal extends React.Component {
    hide(event) {
        event.preventDefault();
        this.props.dispatch(incorrectModal());
    }
    render() {
        return (
           <div className="incorrectModal">
            <div className="content">
                <h3>Your answer is incorrect!</h3>
                <div className="close-modal">
                    <a className="close" id="gotIt" href="#" onClick={e => this.hide(e)}>Next!</a>
                </div>
            </div>
        </div>
        );
    }
}
export default connect()(IncorrectModal);