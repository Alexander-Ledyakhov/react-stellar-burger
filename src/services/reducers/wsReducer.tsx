import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/ws';

import type { TTodoActions } from '../actions/ws';
import {TError, TWsAllOrders} from '../../types/typesApi'

type TTodoListState = {
    wsConnected: boolean;
    orders: TWsAllOrders;
    success: boolean;
    total: number;
    totalToday: number;
    error: TError | undefined;
}

const initialState: TTodoListState = {
    wsConnected: false,
    orders: [],
    success: false,
    total: 0,
    totalToday: 0,
    error: undefined
};

export const wsReducer = (state = initialState, action: TTodoActions) => {

    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                orders: [],
                success: false,
                total: 0,
                totalToday: 0,
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                orders: action.payload.orders,
                success: action.payload.success,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        default:
            return state;
    }
};