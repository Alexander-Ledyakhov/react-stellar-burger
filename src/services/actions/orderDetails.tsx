import { postOrderDetailsApi } from "../../utils/api";
import { AppDispatch } from "../../types/typesReact"

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_ERROR: 'POST_ORDER_ERROR' = 'POST_ORDER_ERROR';

export function postOrderDetails(ingredientsID: string[], token: string) {
    return (dispatch: AppDispatch) => {
        dispatch({type: POST_ORDER_REQUEST})
        
        postOrderDetailsApi(ingredientsID, token)
          .then((json) => {
            if (!json.order) return;
            dispatch({
              type: POST_ORDER_SUCCESS, 
              payload: json.order.number
            })
          })
          .catch((err) => {
            console.log(err)
            dispatch({
              type: POST_ORDER_ERROR,
            })
          })
      }
}

export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly payload: number;
}

export interface IPostOrderErrorAction {
  readonly type: typeof POST_ORDER_ERROR;
}

export type TTodoActionsPostOrderDetails = 
  | IPostOrderRequestAction
  | IPostOrderSuccessAction
  | IPostOrderErrorAction