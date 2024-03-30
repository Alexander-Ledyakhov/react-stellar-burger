import { getIngredientsApi } from "../../utils/api";
import { AppDispatch } from "../../types/typesReact"
import { TIngredient } from "../../types/typesApi";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR: "GET_INGREDIENTS_ERROR" = "GET_INGREDIENTS_ERROR";

export function getIngredients() {
  
  return (dispatch: AppDispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    
    getIngredientsApi()
      .then((json) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS, 
          payload: json
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        })
      })
  }
}


export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: {
    data: TIngredient[];
    success: boolean;
  }
}

export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TTodoActionsGetIngredient = 
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsErrorAction