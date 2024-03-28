import { getInfoUserApi } from "../../utils/api";
import { TDispatch } from "../../types/typesReact"

export const GET_INFO_USER_REQUEST: "GET_INFO_USER_REQUEST" = "GET_INFO_USER_REQUEST";
export const GET_INFO_USER_SUCCESS: "GET_INFO_USER_SUCCESS" = "GET_INFO_USER_SUCCESS";
export const GET_INFO_USER_ERROR: "GET_INFO_USER_ERROR" = "GET_INFO_USER_ERROR";

export function getInfoUser(token: string) {
  return (dispatch: TDispatch) => {
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

export interface IGetInfoUserRequestAction {
  readonly type: typeof GET_INFO_USER_REQUEST;
}

export interface IGetInfoUserSuccessAction {
  readonly type: typeof GET_INFO_USER_SUCCESS;
  readonly payload: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
  }
}

export interface IGetInfoUserErrorAction {
  readonly type: typeof GET_INFO_USER_ERROR;
}

export type TTodoActions = 
  | IGetInfoUserRequestAction
  | IGetInfoUserSuccessAction
  | IGetInfoUserErrorAction