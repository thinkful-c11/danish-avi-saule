import * as Cookies from 'js-cookie';
//USER REQUEST
export const REQUEST_GET_USER='REQUEST_GET_USER';
export const requestGetUser=()=>({
    type: REQUEST_GET_USER
});
export const ALLOW_GET_USER='ALLOW_GET_USER';
export const allowGetUser=(currentUser)=>({
    type: ALLOW_GET_USER,
    currentUser
})
export const REJECT_GET_USER='REJECT_GET_USER';
export const rejectGetUser=(error)=>({
    type: REJECT_GET_USER,
    error
})
export const GET_USER='GET_USER';
export const getUser=(accessToken)=>dispatch=>{
    console.log("This is the access token",accessToken);
    dispatch(requestGetUser())
    return fetch('/api/questions', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => {
            console.log("What is res?",res);
            if (!res.ok) {
                if (res.status === 401) {
                    console.log("Huzzah to weirdness here");
                    // Unauthorized, clear the cookie and go to
                    // the login page
                    Cookies.remove('accessToken');
                    return;
                }
                console.log("break all the things make it cute!");
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(currentUser=>{
            console.log("Huzzah to the currentUser here", currentUser);
            return dispatch(allowGetUser(currentUser));
        })
        .catch(error=>{
            console.log("Huzzah to error here", error);
            dispatch(rejectGetUser(error));
        })
}
export const CORRECT_MODAL='CORRECT_MODAL';
export const correctModal=()=>({
    type:CORRECT_MODAL
})
export const INCORRECT_MODAL='INCORRECT_MODAL';
export const incorrectModal=()=>({
    type:INCORRECT_MODAL
})
export const NEXT_WORD='NEXT_WORD';
export const nextWord=()=>({
    type:NEXT_WORD,
});