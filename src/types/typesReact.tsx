import { TypedUseSelectorHook, useSelector } from "react-redux";
import { store } from "../index"
import { TTodoActionsGetIngredient } from "../services/actions/allIngredients";
import { TTodoActionsAuth } from "../services/actions/auth";
import { TTodoActionsAddIngredient } from "../services/actions/constructorIngredients";
import { TTodoActionsGetInfoUser } from "../services/actions/infoUser";
import { TTodoActionsPostLogout } from "../services/actions/logout";
import { TTodoActionsModalOpen } from "../services/actions/modal";
import { TTodoActionsPostOrderDetails } from "../services/actions/orderDetails";
import { TTodoActionsPostRegister } from "../services/actions/register";
import { TTodoActionsPostToken } from "../services/actions/token";
import { TTodoActionsWs } from "../services/actions/ws";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { useDispatch as dispatchHook} from "react-redux";

export type RootState = ReturnType<typeof store.getState>
type UnknownAction =
| TTodoActionsGetIngredient
| TTodoActionsAuth
| TTodoActionsAddIngredient
| TTodoActionsGetInfoUser
| TTodoActionsPostLogout
| TTodoActionsModalOpen
| TTodoActionsPostOrderDetails
| TTodoActionsPostRegister
| TTodoActionsPostToken
| TTodoActionsWs;

export type AppDispatch = Dispatch<UnknownAction>;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<
  ReturnType,
  Action,
  RootState,
  UnknownAction
>>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => dispatchHook<AppDispatch | AppThunk>();
