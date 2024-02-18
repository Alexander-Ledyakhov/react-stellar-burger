import { postLogoutApi } from "../../utils/api";

export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_ERROR = 'POST_LOGOUT_ERROR';

export function postLogoutAuth(token) {
    return (dispatch) => {
        dispatch({type: POST_LOGOUT_REQUEST})
        
        postLogoutApi(token)
          .then((json) => {
            dispatch({
              type: POST_LOGOUT_SUCCESS, 
              payload: json
            })
          })
          .catch((err) => {
            console.log(err)
            dispatch({
              type: POST_LOGOUT_ERROR,
            })
          })
      }
}