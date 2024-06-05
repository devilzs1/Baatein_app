import io from "socket.io-client";
let socket;

const connectSocket = (user_id) => {
  socket = io("https://baatein-app-backend.onrender.com/", {
    query: `user_id=${user_id}`,
    reconnectionAttempts: 10,
  });
  // socket = io("https://baatein-app-backend.vercel.app", {
  //   query: `user_id=${user_id}`,
  //   reconnectionAttempts: 10,
  // });
    // socket = io("http://localhost:3000", {
    //   query: `user_id=${user_id}`,
    //   reconnectionAttempts: 10,
    // });

  socket.on("connect_error", (error) => {
    console.error("WebSocket connection error:", error);
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log(`WebSocket reconnected after ${attemptNumber} attempts`);
  });

  socket.on("reconnect_failed", () => {
    console.error("WebSocket reconnection failed");
  });
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export { socket, connectSocket, disconnectSocket };

