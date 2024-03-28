import { Middleware } from "redux";

export const socketMiddleware = (
    wsUrl: string, 
    WS_START_USER: string, 
    WS_START: string, 
    WS_SUCCESS: string, 
    WS_ERROR: string, 
    WS_MESSAGE: string, 
    WS_CLOSED: string
  ): Middleware => {
    return store => {
      let socket: any | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken && type === WS_START_USER) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken.slice(7)}`);
        }
        
        if (type === WS_START) {
          socket = new WebSocket(`${wsUrl}/all`);
        }

        if (socket) {
          socket.onopen = (event: any) => {
            dispatch({ type: WS_SUCCESS, payload: event });
          };

          socket.onerror = (event: any) => {
            dispatch({ type: WS_ERROR, payload: event });
          };
  
          socket.onmessage = (event: { data: any }) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch({ type: WS_MESSAGE, payload: parsedData });
          };
  
          socket.onclose = (event: any) => {
            dispatch({ type: WS_CLOSED, payload: event });
          };

          if (type === WS_CLOSED) {
            socket.close();
          }
        }

        next(action);
    };
  };
};