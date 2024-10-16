import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react';
import useWebSocket, { ReadyState, SendMessage } from 'react-use-websocket';
import { IServerResponse } from './types.ts';

interface IWebSocketContext {
  isConnected: boolean;
  setUrl: Dispatch<SetStateAction<string>>;
  sendMessage: SendMessage;
  readyState: ReadyState;
  isAdmin: boolean;
  parsedMessage: IServerResponse | null;
}

export const WebSocketContext = createContext({} as IWebSocketContext);

export const WebSocketProvider = ({ children }: { children?: ReactNode }) => {
  const [url, setUrl] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { sendMessage, readyState, lastMessage } = useWebSocket(
    `wss://${url}`,
    {
      share: true
    },
    !!url
  );

  const parsedMessage = useMemo(() => {
    if (!lastMessage) return null;
    let parsed: IServerResponse;
    try {
      parsed = JSON.parse(lastMessage.data as string) as IServerResponse;
    } catch (e) {
      console.error(e);
      return null;
    }
    return parsed;
  }, [lastMessage]);

  const isConnected = useMemo(() => readyState === ReadyState.OPEN, [readyState]);

  useEffect(() => {
    if (!parsedMessage || !('isAdminRole' in parsedMessage)) {
      return;
    } else setIsAdmin(parsedMessage.isAdminRole);
  }, [parsedMessage]);

  return (
    <WebSocketContext.Provider
      value={{
        setUrl,
        sendMessage,
        readyState,
        isConnected,
        isAdmin,
        parsedMessage
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};
