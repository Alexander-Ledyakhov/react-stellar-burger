import { postLogoutApi } from "../../utils/api";
import { TDispatch } from "../../types/typesReact"

export const POST_LOGOUT_REQUEST: 'POST_LOGOUT_REQUEST' = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS: 'POST_LOGOUT_SUCCESS' = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_ERROR: 'POST_LOGOUT_ERROR' = 'POST_LOGOUT_ERROR';

export function postLogoutAuth(token: string) {
  return (dispatch: TDispatch) => {
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

export interface IPostLogoutRequestAction {
  readonly type: typeof POST_LOGOUT_REQUEST;
}

export interface IPostLogoutSuccessAction {
  readonly type: typeof POST_LOGOUT_SUCCESS;
  readonly payload: {
    success: boolean;
  }
}

export interface IPostLogoutErrorAction {
  readonly type: typeof POST_LOGOUT_ERROR;
}

export type TTodoActions = 
  | IPostLogoutRequestAction
  | IPostLogoutSuccessAction
  | IPostLogoutErrorAction