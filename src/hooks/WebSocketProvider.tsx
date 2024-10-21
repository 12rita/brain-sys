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
import { WS_URL } from './const.ts';

interface IWebSocketContext {
  isConnected: boolean;
  setOpenConnection: Dispatch<SetStateAction<boolean>>;
  sendMessage: SendMessage;
  readyState: ReadyState;
  isAdmin: boolean;
  parsedMessage: IServerResponse | null;
}

export const WebSocketContext = createContext({} as IWebSocketContext);

export const WebSocketProvider = ({ children }: { children?: ReactNode }) => {
  const [openConnection, setOpenConnection] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { sendMessage, readyState, lastMessage } = useWebSocket(
    WS_URL,
    {
      share: true
    },
    openConnection
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
        setOpenConnection,
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
