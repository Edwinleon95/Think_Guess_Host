import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const SOCKET = io(BACKEND_URL, {
    transports: ["websocket"],
    query: {
        isHost: true, 
    },
});