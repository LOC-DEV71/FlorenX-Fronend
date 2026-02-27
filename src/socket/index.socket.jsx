import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", {
//   withCredentials: true,
//   autoConnect: false
// });


const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
  withCredentials: true,
});


// const socket = io("https://nodejs-production-a6f1.up.railway.app/", {
//   withCredentials: true,
//   autoConnect: false
// });

export default socket;
