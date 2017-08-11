//  ______________________
// |                      |
// |     IMPORTS HERE     |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
import * as Cookies from 'js-cookie';
//  ______________________
// |                      |
// |     USER REQUESTS    |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
//When a user has clicked to authenticate via OAuth
export const REQUEST_GET_USER='REQUEST_GET_USER';
export const requestGetUser=()=>({
    type: REQUEST_GET_USER
});
//Retrieve the user once OAuth is successful
export const ALLOW_GET_USER='ALLOW_GET_USER';
export const allowGetUser=(currentUser)=>({
    type: ALLOW_GET_USER,
    currentUser
})
//If OAuth has an issue
export const REJECT_GET_USER='REJECT_GET_USER';
export const rejectGetUser=(error)=>({
    type: REJECT_GET_USER,
    error
})
export const GET_USER='GET_USER';
export const getUser=(accessToken)=>dispatch=>{
    dispatch(requestGetUser())
    return fetch('/api/questions', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                    console.log("Huzzah to weirdness here");
                    // Unauthorised user, remove their access token
                    Cookies.remove('accessToken');
                    return;
                }
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(currentUser=>{
            return dispatch(allowGetUser(currentUser));
        })
        .catch(error=>{
            dispatch(rejectGetUser(error));
        })
}