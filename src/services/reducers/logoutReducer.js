import {
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_ERROR
  } from "../actions/logout";
  
  const initialState = {
    success: false,
    accessToken: '',
    refreshToken: '',
    user: {
      email: '',
      name: ''
    },
    error: false,
    request: false
  };
  
  export const logoutReducer = (state = initialState, action = {}) => {

    switch (action.type) {
      case POST_LOGOUT_REQUEST: {
        return {
            ...state,
            success: false,
            error: false,
            request: true
        };
      }
      case POST_LOGOUT_SUCCESS: {
        localStorage.clear();
        return {
          ...state,
          success: action.payload.success,
          accessToken: '',
          refreshToken: '',
          user: {
            email: '',
            name: ''
          },
          error: false,
          request: false
        };
      }
      case POST_LOGOUT_ERROR: {
        return {
          ...state,
          success: false,
          accessToken: '',
          refreshToken: '',
          error: true,
          request: false
        };
      }
      default: {
        return state;
      }
    }
  };