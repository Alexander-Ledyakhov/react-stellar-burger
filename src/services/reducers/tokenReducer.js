import {
    POST_TOKEN_REQUEST,
    POST_TOKEN_SUCCESS,
    POST_TOKEN_ERROR
  } from "../actions/token";
  
  const initialState = {
    success: false,
    accessToken: '',
    refreshToken: '',
    error: false
  };
  
  export const tokenReducer = (state = initialState, action = {}) => {

    switch (action.type) {
      case POST_TOKEN_REQUEST: {
        return {
            ...state,
            success: false,
            error: false
        };
      }
      case POST_TOKEN_SUCCESS: {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        return {
          ...state,
          success: action.payload.success,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          error: false
        };
      }
      case POST_TOKEN_ERROR: {
        return {
          ...state,
          success: false,
          accessToken: '',
          refreshToken: '',
          error: true
        };
      }
      default: {
        return state;
      }
    }
  };