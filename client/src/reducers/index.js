import * as actions from '../actions';
const initialState = {
    currentUser: null,
    getUser: false, //If user tries to use an access token get them
    error: null, //If user has bad credentials reject them
    showCorrectModal: false,
    showIncorrectModal: false
};
export const reducer = (state=initialState,action) => {
    switch (action.type){
        case actions.REQUEST_GET_USER:
            return Object.assign({},state,{getUser:true})
        case actions.ALLOW_GET_USER:
            return Object.assign({},state,{currentUser: action.currentUser,getUser:false})
        case actions.REJECT_GET_USER:
            return Object.assign({},state,{error: action.error,getUser: false})
        case actions.CORRECT_MODAL:
            return Object.assign({},state,{showCorrectModal:true})
        case actions.INCORRECT_MODAL:
            return Object.assign({},state,{showIncorrectModal:true})
        default:
            return state;
    }
};
