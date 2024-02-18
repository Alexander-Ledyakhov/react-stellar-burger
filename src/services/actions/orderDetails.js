import { postOrderDetailsApi } from "../../utils/api";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_ERROR = 'POST_ORDER_ERROR';

export function postOrderDetails(ingredientsID, token) {
    return (dispatch) => {
        dispatch({type: POST_ORDER_REQUEST})
        
        postOrderDetailsApi(ingredientsID, token)
          .then((json) => {
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