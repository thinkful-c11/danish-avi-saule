import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //optional
import * as reducer from './reducers';

export default createStore(reducer, applyMiddleware(thunk));