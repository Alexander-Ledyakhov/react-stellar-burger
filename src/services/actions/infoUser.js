import { getInfoUserApi } from "../../utils/api";

export const GET_INFO_USER_REQUEST = "GET_INFO_USER_REQUEST";
export const GET_INFO_USER_SUCCESS = "GET_INFO_USER_SUCCESS";
export const GET_INFO_USER_ERROR = "GET_INFO_USER_ERROR";

export function getInfoUser(token) {
  return (dispatch) => {
    dispatch({type: GET_INFO_USER_REQUEST})
    
    getInfoUserApi(token)
      .then((json) => {
        dispatch({
          type: GET_INFO_USER_SUCCESS, 
          payload: json
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_INFO_USER_ERROR
        })
      })
  }
}
