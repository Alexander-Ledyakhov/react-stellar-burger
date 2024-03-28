import {
    GET_INFO_USER_REQUEST, 
    GET_INFO_USER_SUCCESS,
    GET_INFO_USER_ERROR,
    TTodoActions
} from "../actions/infoUser";

type TTodoListState = {
    success: boolean;
    email: string;
    name: string;
    error: boolean;
}

const initialState: TTodoListState = {
    success: false,
    email: '',
    name: '',
    error: false
}

export const infoUserReducer = ( state = initialState, action: TTodoActions ) => {    
    switch (action.type) {
        case GET_INFO_USER_REQUEST:
            return {
                ...state,
                success: false,
                error: false
            }
        case GET_INFO_USER_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                email: action.payload.user.email,
                name: action.payload.user.name,
                error: false
            }
        case GET_INFO_USER_ERROR:
            return {
                ...state,
                success: false,
                error: true
            }    
        default:
            return state
    }
}