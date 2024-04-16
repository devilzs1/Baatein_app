import io from "socket.io-client";
let socket;

const connectSocket = (user_id) => {
  socket = io("http://localhost:3001" || "https://baatein-app-backend.vercel.app/", {
    query: `user_id=${user_id}`,
  });
};

export { socket, connectSocket };
