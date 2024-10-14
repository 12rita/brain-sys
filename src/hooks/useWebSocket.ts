import {useContext} from "react";
import {WebSocketContext} from "./WebsocketProvider.tsx";

export const useWebSocketContext = () => useContext(WebSocketContext);
