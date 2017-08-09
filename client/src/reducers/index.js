import * as action from '../actions';
const initialState = {
    currentUser: null,
    getUser: false, //If user tries to use an access token get them
    error: null //If user has bad credentials reject them
};
export const reducer = (state=initialState,action) => {
    switch (action.type){
        case action.REQUEST_GET_USER:
            return Object.assign({},state,{getUser:true})
        case action.ALLOW_GET_USER:
            return Object.assign({},state,{currentUser: action.currentUser,getUser:false})
        case action.REJECT_GET_USER:
            return Object.assign({},state,{error: action.error,getUser: false})
        default:
            return state;
    }
};