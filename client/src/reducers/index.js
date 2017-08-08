const initialState = {

};

export const reducer = (state=initialState, action) => {
    switch (action.type){
        case NEXT_WORD:
            return Object.assign({}, initialState)
        default:
            return state;
    }
};