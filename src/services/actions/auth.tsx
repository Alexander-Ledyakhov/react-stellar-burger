import { postAuthApi } from "../../utils/api";
import { TDispatch } from "../../types/typesReact"

export const POST_AUTH_REQUEST: 'POST_AUTH_REQUEST' = 'POST_AUTH_REQUEST';
export const POST_AUTH_SUCCESS: 'POST_AUTH_SUCCESS' = 'POST_AUTH_SUCCESS';
export const POST_AUTH_ERROR: 'POST_AUTH_ERROR' = 'POST_AUTH_ERROR';

export function postAuth(email: string, password: string) {
  return (dispatch: TDispatch) => {
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

export interface IPostAuthRequestAction {
  readonly type: typeof POST_AUTH_REQUEST;
}

export interface IPostAuthSuccessAction {
  readonly type: typeof POST_AUTH_SUCCESS;
  readonly payload: {
    success: boolean
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

export interface IPostAuthErrorAction {
  readonly type: typeof POST_AUTH_ERROR;
}

export type TTodoActions = 
  | IPostAuthRequestAction
  | IPostAuthSuccessAction
  | IPostAuthErrorAction