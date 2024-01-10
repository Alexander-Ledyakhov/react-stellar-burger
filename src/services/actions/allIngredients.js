import { getIngredientsApi } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export function getIngredients() {
  return (dispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    
    getIngredientsApi()
      .then((json) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS, 
          payload: json.data
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
