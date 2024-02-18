import { combineReducers } from "redux";
import { ingredientsReducer } from "./allIngredientsReducer";
import { constructorIngredientsReducer } from './constructorReducer'
import { modalReducer } from './modalReducer'
import { orderDetailsReducer } from './orderDetailsReducer'
import { registerReducer } from './registerReducer'
import { authReducer } from './authReducer'
import { tokenReducer } from './tokenReducer'
import { logoutReducer } from './logoutReducer'
import { infoUserReducer } from './infoUserReducer'

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorIngredientsReducer,
  modalReducer,
  orderDetailsReducer,
  registerReducer,
  authReducer,
  tokenReducer,
  logoutReducer,
  infoUserReducer,
});