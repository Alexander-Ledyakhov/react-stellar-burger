export const socketMiddleware = (
    wsUrl, 
    WS_START_USER, 
    WS_START, 
    WS_SUCCESS, 
    WS_ERROR, 
    WS_MESSAGE, 
    WS_CLOSED
  ) => {
    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch, getState } = store;
        const { type } = action;
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken && type === WS_START_USER) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken.slice(7)}`);
        }
        
        if (type === WS_START) {
          socket = new WebSocket(`${wsUrl}/all`);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: WS_SUCCESS, payload: event });
          };

          socket.onerror = event => {
            dispatch({ type: WS_ERROR, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch({ type: WS_MESSAGE, payload: parsedData });
          };
  
          socket.onclose = event => {
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