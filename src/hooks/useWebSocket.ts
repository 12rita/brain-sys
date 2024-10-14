import {useContext} from "react";
import {WebSocketContext} from "./WebSocketProvider.tsx";

export const useWebSocketContext = () => useContext(WebSocketContext);
