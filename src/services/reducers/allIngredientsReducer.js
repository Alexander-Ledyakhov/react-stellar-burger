import {
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST
} from "../actions/allIngredients";

const initialState = {
    allIngredients: [],
    isRequest: false,
    isSuccess: false,
    isError: false,
}

export const ingredientsReducer = ( state = initialState, action ) => {    
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                isRequest: true,
                isSuccess: false,
                isError: false
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                allIngredients: action.payload.data, 
                isSuccess: action.payload.success,
                isRequest: false,
                isError: false
            }
        case GET_INGREDIENTS_ERROR:
            return {
                ...state,
                isSuccess: false, 
                isRequest: false,
                isError: true
            }    
        default:
            return state
    }
}