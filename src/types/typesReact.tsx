import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState, store } from "../index"

export type TDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector