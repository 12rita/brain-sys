import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
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
  const didUnmount = useRef(false);
  const { readyState, lastJsonMessage, ...otherProps } = useWebSocket(
    WS_URL,
    {
      share: true
    },
    openConnection
  );

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  // const parsedMessage = useMemo(() => {
  //   if (!lastMessage) return null;
  //   let parsed: IServerResponse;
  //   try {
  //     parsed = JSON.parse(lastMessage.data as string) as IServerResponse;
  //   } catch (e) {
  //     console.error(e);
  //     return null;
  //   }
  //   return parsed;
  // }, [lastMessage]);

  const isConnected = useMemo(() => readyState === ReadyState.OPEN, [readyState]);
  console.log({ readyState, ReadyState });
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
