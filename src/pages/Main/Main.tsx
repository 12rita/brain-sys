import styles from './styles.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useNoReturn, useToaster, useWebSocketContext } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { ERoutes } from '../../routes.ts';
import { Button } from '../../components';

export const Main = () => {
  const { isConnected, sendJsonMessage, isAdmin, parsedMessage } = useWebSocketContext();
  const [disabled, setDisabled] = useState(false);
  const { setMessage } = useToaster();
  useNoReturn();
  const sendAnswer = useCallback(() => {
    sendJsonMessage && sendJsonMessage({ date: Date.now() });
    setDisabled(true);
  }, [sendJsonMessage]);

  useEffect(() => {
    if (parsedMessage && 'reset' in parsedMessage) {
      setMessage({ title: 'success', text: JSON.stringify(parsedMessage) });
      setDisabled(!parsedMessage.reset);
    }
  }, [parsedMessage, setMessage]);

  if (!isConnected) {
    return <Navigate to={ERoutes.CONNECT} />;
  }
  if (isAdmin) {
    return <Navigate to={ERoutes.ADMIN} />;
  }

  return (
    <Button disabled={disabled} onClickButton={sendAnswer} className={styles.button}>
      {'Я знаю ответ!'}
    </Button>
  );
};
