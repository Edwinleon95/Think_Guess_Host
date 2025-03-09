import { io } from "socket.io-client";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const SOCKET_URL = BACKEND_URL;

export const SOCKET = io(SOCKET_URL, {
    transports: ["websocket"]
});