import { combineReducers } from "redux";
import { ingredientsReducer } from "./allIngredientsReducer";
import { constructorIngredientsReducer } from './constructorReducer'
import { modalReducer } from './modalReducer'
import { orderDetailsReducer } from './orderDetailsReducer'

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorIngredientsReducer,
  modalReducer,
  orderDetailsReducer
});