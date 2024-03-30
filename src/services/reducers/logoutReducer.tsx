import { TUser } from "../../types/typesApi";
import {
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_ERROR,
  TTodoActionsPostLogout
} from "../actions/logout";

type TTodoListState = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser | {};
  error: boolean;
  request: boolean;
}

const initialState: TTodoListState = {
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

export const logoutReducer = (state = initialState, action: TTodoActionsPostLogout) => {

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