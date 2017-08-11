//  ______________________
// |                      |
// |     IMPORTS HERE     |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
import * as actions from '../actions';
//  ______________________
// |                      |
// |    INITIAL STATE     |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
const initialState = {
    currentUser: null,
    getUser: false, //If user tries to use an access token get them
    error: null //If user has bad credentials reject them
};
//  ______________________
// |                      |
// |        REDUCER       |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
export const reducer = (state=initialState,action) => {
    switch (action.type){
        case actions.REQUEST_GET_USER:
            return Object.assign({},state,{getUser:true})
        case actions.ALLOW_GET_USER:
            return Object.assign({},state,{currentUser: action.currentUser,getUser:false})
        case actions.REJECT_GET_USER:
            return Object.assign({},state,{error: action.error,getUser: false})
        default:
            return state;
    }
};
