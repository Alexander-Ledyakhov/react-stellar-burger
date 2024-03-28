import { TIngredient } from "../../types/typesApi";
import {
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    TTodoActions
} from "../actions/allIngredients";

type TTodoListState = {
    allIngredients: TIngredient[];
    isRequest: boolean;
    isSuccess: boolean;
    isError: boolean;
  }

const initialState: TTodoListState = {
    allIngredients: [{
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
    }],
    isRequest: false,
    isSuccess: false,
    isError: false,
}

export const ingredientsReducer = ( state = initialState, action: TTodoActions ) => {    
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