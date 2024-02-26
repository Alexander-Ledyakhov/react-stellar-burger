export const socketMiddleware = (wsUrl, wsActionTypes) => {
    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch, getState } = store;
        const { type } = action;
        const accessToken = localStorage.getItem('accessToken')

        const {
          WS_CONNECTION_START_USER,
          WS_CONNECTION_START,
          WS_CONNECTION_SUCCESS,
          WS_CONNECTION_ERROR,
          WS_GET_MESSAGE,
          WS_CONNECTION_CLOSED
        } = wsActionTypes;

        if (accessToken && type === WS_CONNECTION_START_USER) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken.slice(7)}`);
        }
        
        if (type === WS_CONNECTION_START) {
          socket = new WebSocket(`${wsUrl}/all`);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
          };

          socket.onerror = event => {
            dispatch({ type: WS_CONNECTION_ERROR, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
          };
  
          socket.onclose = event => {
            dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
          };

          if (type === WS_CONNECTION_CLOSED) {
            socket.close();
          }
        }

        next(action);
    };
  };
};