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
import { WebSocketHook } from 'react-use-websocket/dist/lib/types';
import { useToaster } from './useToaster.ts';

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
  const { setMessage } = useToaster();
  const DEFAULT_URL = import.meta.env.VITE_WEBSOCKET_URL as string;

  const url_link = useMemo(() => (url ? url : DEFAULT_URL), [DEFAULT_URL, url]);

  const { readyState, lastJsonMessage, ...otherProps } = useWebSocket(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    url_link,
    {
      share: true,
      onClose: () => {
        if (readyState === ReadyState.CLOSED)
          setMessage({ title: 'error', text: 'Connection was closed' });
        else if (readyState === ReadyState.UNINSTANTIATED)
          setMessage({ title: 'error', text: 'Connecting problems' });
        setOpenConnection(false);
      },
      retryOnError: true
      // shouldReconnect: () => {
      //   return true;
      // }
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
        setURL,
        parsedMessage: lastJsonMessage as IServerResponse,
        ...otherProps
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};
