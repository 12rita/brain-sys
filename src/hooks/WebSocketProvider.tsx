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
  setURL: Dispatch<SetStateAction<string>>;
  readyState: ReadyState;
  isAdmin: boolean;
  parsedMessage: IServerResponse | null;
}

export const WebSocketContext = createContext({} as IWebSocketContext);

export const WebSocketProvider = ({ children }: { children?: ReactNode }) => {
  const [openConnection, setOpenConnection] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [url, setURL] = useState('');

  const { readyState, lastJsonMessage, ...otherProps } = useWebSocket(
    url ? url : WS_URL,
    {
      share: true,
      onClose: () => {
        setOpenConnection(false);
      }
    },
    openConnection || !!url
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
        setURL,
        parsedMessage: lastJsonMessage as IServerResponse,
        ...otherProps
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};
