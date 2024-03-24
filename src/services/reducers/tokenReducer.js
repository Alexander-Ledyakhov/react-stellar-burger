import {
    POST_TOKEN_REQUEST,
    POST_TOKEN_SUCCESS,
    POST_TOKEN_ERROR
  } from "../actions/token";
  
  const initialState = {
    success: false,
    accessToken: '',
    refreshToken: '',
    ddd: {},
    error: ''
  };
  
  export const tokenReducer = (state = initialState, action = {}) => {

    switch (action.type) {
      case POST_TOKEN_REQUEST: {
        return {
            ...state,
            success: false,
            error: ''
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
          ddd: action.payload,
          error: ''
        };
      }
      case POST_TOKEN_ERROR: {
        return {
          ...state,
          success: false,
          accessToken: '',
          refreshToken: '',
          error: action.payload
        };
      }
      default: {
        return state;
      }
    }
  };