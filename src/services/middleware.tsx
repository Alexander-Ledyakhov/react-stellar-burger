import { Middleware } from "redux";
import { TwsActions } from "../types/functionComponentType";

export const socketMiddleware = (
  wsActions: TwsActions
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      wsInitAuth,
      wsInit,
      wsClose,
      wsOpen,
      wsError,
      wsMessage,
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsInit || type === wsInitAuth) {
        socket = new WebSocket(payload);
        socket.onopen = (event) => {
          dispatch({ type: wsOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsMessage, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: wsClose, payload: event });
        };
      }

      if (wsClose && type === wsClose && socket) {
        socket.close();
      }

      next(action);
    };
  };
};