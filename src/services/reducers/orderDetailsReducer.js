import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_ERROR
  } from "../actions/orderDetails";
  
  const initialState = {
    orderNumber: null,
    isRequest: false,
    isSuccess: false,
    isError: false,
  };
  
  export const orderDetailsReducer = (state = initialState, action = {}) => {

    switch (action.type) {
      case POST_ORDER_REQUEST: {
        return {
            ...state,
            isRequest: true,
            isSuccess: false,
            isError: false
        };
      }
      case POST_ORDER_SUCCESS: {
        return {
          ...state,
          orderNumber: action.payload, 
          isSuccess: true,
          isRequest: false,
          isError: false
        };
      }
      case POST_ORDER_ERROR: {
        return {
          ...state,
          isSuccess: false, 
          isRequest: false,
          isError: true
        };
      }
      default: {
        return state;
      }
    }
  };