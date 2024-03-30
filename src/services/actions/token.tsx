import { postTokenApi } from "../../utils/api";
import { AppDispatch } from "../../types/typesReact"
import { TError } from "../../types/typesApi";

export const POST_TOKEN_REQUEST: 'POST_TOKEN_REQUEST' = 'POST_TOKEN_REQUEST';
export const POST_TOKEN_SUCCESS: 'POST_TOKEN_SUCCESS' = 'POST_TOKEN_SUCCESS';
export const POST_TOKEN_ERROR: 'POST_TOKEN_ERROR' = 'POST_TOKEN_ERROR';

export function postTokenAuth(token: string) {
  return (dispatch: AppDispatch) => {
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

export interface IPostTokenRequestAction {
  readonly type: typeof POST_TOKEN_REQUEST;
}

export interface IPostTokenSuccessAction {
  readonly type: typeof POST_TOKEN_SUCCESS;
  readonly payload: {
    readonly success: boolean;
    readonly accessToken: string;
    readonly refreshToken: string;
  }
}

export interface IPostTokenErrorAction {
  readonly type: typeof POST_TOKEN_ERROR;
  readonly payload: TError;
}

export type TTodoActionsPostToken = 
  | IPostTokenRequestAction
  | IPostTokenSuccessAction
  | IPostTokenErrorAction