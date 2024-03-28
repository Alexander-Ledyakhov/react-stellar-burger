import { postRegisterApi } from "../../utils/api";
import { TDispatch } from "../../types/typesReact"

export const POST_REGISTER_REQUEST: 'POST_REGISTER_REQUEST' = 'POST_REGISTER_REQUEST';
export const POST_REGISTER_SUCCESS: 'POST_REGISTER_SUCCESS' = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR: 'POST_REGISTER_ERROR' = 'POST_REGISTER_ERROR';

export function postRegister(email: string, password: string, name: string) {
  return (dispatch: TDispatch) => {
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

export interface IPostRegisterRequestAction {
  readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly payload: {
    success: boolean
    user: {
      email: string;
      password: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

export interface IPostRegisterErrorAction {
  readonly type: typeof POST_REGISTER_ERROR;
}

export type TTodoActions = 
  | IPostRegisterRequestAction
  | IPostRegisterSuccessAction
  | IPostRegisterErrorAction