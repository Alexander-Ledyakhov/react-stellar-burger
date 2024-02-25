import { postRegisterApi } from "../../utils/api";

export const POST_REGISTER_REQUEST = 'POST_REGISTER_REQUEST';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR = 'POST_REGISTER_ERROR';

export function postRegister(email, password, name) {
    return (dispatch) => {
        dispatch({type: POST_REGISTER_REQUEST})
        
        postRegisterApi(email, password, name)
          .then((json) => {
            dispatch({
              type: POST_REGISTER_SUCCESS, 
              payload: json
            })
          })
          .catch((err) => {
            console.log(err)
            dispatch({
              type: POST_REGISTER_ERROR,
            })
          })
      }
}