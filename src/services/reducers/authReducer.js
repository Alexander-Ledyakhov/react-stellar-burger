import {
  POST_AUTH_REQUEST,
  POST_AUTH_SUCCESS,
  POST_AUTH_ERROR
} from "../actions/auth";
  
const initialState = {
  success: false,
  user: {},
  accessToken: '',
  refreshToken: '',
  error: false,
  request: false
};
  
export const authReducer = (state = initialState, action = {}) => {

  switch (action.type) {
    case POST_AUTH_REQUEST: {
      return {
          ...state,
          success: false,
          error: false,
          request: true
      };
    }
    case POST_AUTH_SUCCESS: {
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.removeItem('emailForgotPassword')
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: false,
        request: false
      };
    }
    case POST_AUTH_ERROR: {
      return {
        ...state,
        success: false,
        user: {
            email: '',
            name: ''
        },
        accessToken: '',
        refreshToken: '',
        error: false,
        request: false
      };
    }
    default: {
      return state;
    }
  }
};