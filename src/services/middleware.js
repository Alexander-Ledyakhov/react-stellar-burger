export const socketMiddleware = (wsUrl) => {
    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch, getState } = store;
        const { type } = action;
        const accessToken = getState().tokenReducer.accessToken.slice(7);
  
        if (accessToken && type === 'WS_CONNECTION_START_USER') {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }
        
        if (type === 'WS_CONNECTION_START') {
          socket = new WebSocket(`${wsUrl}/all`);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
          };

          socket.onerror = event => {
            dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
          };
  
          socket.onclose = event => {
            dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
          };
        }

        next(action);
    };
  };
};