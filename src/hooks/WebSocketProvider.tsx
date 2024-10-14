import {createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState} from 'react';
import useWebSocket, {ReadyState, SendMessage} from 'react-use-websocket';

interface IWebSocketContext {
    isConnected: boolean;
    setUrl:  Dispatch<SetStateAction<string>>
    sendMessage: SendMessage
    readyState: ReadyState
}

export const WebSocketContext = createContext({} as IWebSocketContext);

export const WebSocketProvider = ({ children }: { children?: ReactNode }) => {
    const [url, setUrl] = useState("");

    const { sendMessage, readyState } = useWebSocket(`wss://${url}`, {
        share: true
    }, !!url);
    
    const isConnected = useMemo(()=>readyState === ReadyState.OPEN, [readyState]);

    return (
        <WebSocketContext.Provider value={{
            setUrl,
            sendMessage,
            readyState,
            isConnected
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};
