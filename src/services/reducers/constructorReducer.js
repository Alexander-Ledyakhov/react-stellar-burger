import { 
    ADD_BUN, 
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT, 
    CHANGE_ORDER_INGREDIENT 
} from "../actions/constructorIngredients";

const initialState = {
    empty: true,
    ingredients: [],
    bun: null
}

export function constructorIngredientsReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_BUN:
            return {
                ...state, 
                empty: false,
                bun: action.payload,
            };

        case ADD_INGREDIENT:
            return {
                ...state, 
                empty: false, 
                ingredients: [ ...state.ingredients, action.payload ]
            };

        case REMOVE_INGREDIENT:  
            const remove = (emptyValue) => {
                return {
                    ...state, 
                    empty: emptyValue, 
                    ingredients: [...state.ingredients].filter(ingredient =>  ingredient.key !== action.payload.item)
                };
            }
            if ((state.ingredients.length === 1) && (state.bun === null)) {
                return remove(true);
            } else {
                return remove(false);
            }   

        case CHANGE_ORDER_INGREDIENT:
                const drag = action.payload.dragIndex;
                const hover = action.payload.hoverIndex;
                [state.ingredients[drag], state.ingredients[hover]] = [state.ingredients[hover], state.ingredients[drag]]
                return {
                    ...state, 
                    ingredients: state.ingredients
                }

        default:
            return state;
    }
}