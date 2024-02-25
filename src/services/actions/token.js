import { postTokenApi } from "../../utils/api";

export const POST_TOKEN_REQUEST = 'POST_TOKEN_REQUEST';
export const POST_TOKEN_SUCCESS = 'POST_TOKEN_SUCCESS';
export const POST_TOKEN_ERROR = 'POST_TOKEN_ERROR';

export function postTokenAuth(token) {
    return (dispatch) => {
        dispatch({type: POST_TOKEN_REQUEST})
        
        postTokenApi(token)
          .then((json) => {
            dispatch({
              type: POST_TOKEN_SUCCESS, 
              payload: json
            })
          })
          .catch((err) => {
            console.log(err)
            dispatch({
              type: POST_TOKEN_ERROR, 
              payload: err
            })
          })
      }
}