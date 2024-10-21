import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { IAdminData, IServerResponse } from './types.ts';
import { WS_URL } from './const.ts';
import { WebSocketHook } from 'react-use-websocket/dist/lib/types';

interface IWebSocketContext extends Partial<WebSocketHook<unknown>> {
  isConnected: boolean;
  setOpenConnection: Dispatch<SetStateAction<boolean>>;
  readyState: ReadyState;
  isAdmin: boolean;
  parsedMessage: IServerResponse | null;
}

export const WebSocketContext = createContext({} as IWebSocketContext);

export const WebSocketProvider = ({ children }: { children?: ReactNode }) => {
  const [openConnection, setOpenConnection] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { readyState, lastJsonMessage, ...otherProps } = useWebSocket(
    WS_URL,
    {
      share: true
    },
    openConnection
  );

  const isConnected = useMemo(() => readyState === ReadyState.OPEN, [readyState]);
  // console.log({ readyState, ReadyState });
  useEffect(() => {
    if (!lastJsonMessage || !('isAdminRole' in (lastJsonMessage as IServerResponse))) {
      return;
    } else setIsAdmin((lastJsonMessage as IAdminData).isAdminRole);
  }, [lastJsonMessage]);

  return (
    <WebSocketContext.Provider
      value={{
        setOpenConnection,
        readyState,
        isConnected,
        isAdmin,
        parsedMessage: lastJsonMessage as IServerResponse,
        ...otherProps
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};
