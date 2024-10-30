import { ReactNode, useEffect, useState } from 'react';
import { IMessage, ToasterContext } from './useToaster.ts';
import { Toaster } from '../components';

export const ToasterProvider = ({ children }: { children?: ReactNode }) => {
  const [message, setMessage] = useState({} as IMessage);

  useEffect(() => {
    if (message.title) {
      setTimeout(() => {
        setMessage({} as IMessage);
      }, 3000);
    }
  }, [message.title]);

  return (
    <ToasterContext.Provider
      value={{
        message,
        setMessage
      }}>
      {message.title && <Toaster />}
      {children}
    </ToasterContext.Provider>
  );
};
