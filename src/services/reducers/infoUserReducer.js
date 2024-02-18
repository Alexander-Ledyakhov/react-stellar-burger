import {
    GET_INFO_USER_REQUEST, 
    GET_INFO_USER_SUCCESS,
    GET_INFO_USER_ERROR
} from "../actions/infoUser";

const initialState = {
    success: false,
    user: {},
    error: false
}

export const infoUserReducer = ( state = initialState, action ) => {    
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
                user: action.payload.user, 
                success: true,
                error: false
            }
        case GET_INFO_USER_ERROR:
            return {
                ...state,
                error: true
            }    
        default:
            return state
    }
}