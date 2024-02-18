import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR
  } from "../actions/register";
  
  const initialState = {
    success: false,
    user: {},
    accessToken: '',
    refreshToken: '',
    error: false
  };
  
  export const registerReducer = (state = initialState, action = {}) => {

    switch (action.type) {
      case POST_REGISTER_REQUEST: {
        return {
            ...state,
            success: false,
            user: {},
            accessToken: '',
            refreshToken: '',
            error: false
        };
      } 
      case POST_REGISTER_SUCCESS: {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.removeItem('emailForgotPassword')
        return {
            ...state,
            success: action.payload.success,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            error: false
        };
      }
      case POST_REGISTER_ERROR: {
        return {
            ...state,
            success: false,
            error: true
        };
      }
      default: {
        return state;
      }
    }
  };