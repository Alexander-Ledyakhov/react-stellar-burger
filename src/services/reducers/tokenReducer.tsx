import {
  POST_TOKEN_REQUEST,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_ERROR,
  TTodoActions
} from "../actions/token";
  
type TTodoListState = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  error: string;
}

const initialState: TTodoListState = {
  success: false,
  accessToken: '',
  refreshToken: '',
  error: ''
};

export const tokenReducer = (state = initialState, action: TTodoActions): TTodoListState => {

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
        error: ''
      };
    }
    case POST_TOKEN_ERROR: {
      return {
        ...state,
        success: false,
        accessToken: '',
        refreshToken: '',
        error: action.payload.message
      };
    }
    default: {
      return state;
    }
  }
};