import { postAuthApi } from "../../utils/api";

export const POST_AUTH_REQUEST = 'POST_AUTH_REQUEST';
export const POST_AUTH_SUCCESS = 'POST_AUTH_SUCCESS';
export const POST_AUTH_ERROR = 'POST_AUTH_ERROR';

export function postAuth(email, password) {
    return (dispatch) => {
        dispatch({type: POST_AUTH_REQUEST})
        
        postAuthApi(email, password)
          .then((json) => {
            dispatch({
              type: POST_AUTH_SUCCESS,
              payload: json
            })
          })
          .catch((err) => {
            console.log(err)
            dispatch({
              type: POST_AUTH_ERROR,
            })
          })
      }
}