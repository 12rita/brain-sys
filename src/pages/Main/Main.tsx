import styles from './styles.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useWebSocketContext } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../../routes.ts';
import { Button } from '../../components';

export const Main = () => {
  const navigate = useNavigate();
  const { isConnected, sendMessage, isAdmin, parsedMessage } = useWebSocketContext();

  useEffect(() => {
    if (!isConnected) navigate(ERoutes.CONNECT);
    if (isConnected && isAdmin) navigate(ERoutes.ADMIN);
  }, [isAdmin, isConnected, navigate]);

  const [disabled, setDisabled] = useState(false);

  const sendAnswer = useCallback(() => {
    sendMessage(JSON.stringify({ date: Date.now() }));
    setDisabled(true);
  }, [sendMessage]);

  useEffect(() => {
    if (parsedMessage && 'reset' in parsedMessage) {
      setDisabled(!parsedMessage.reset);
    }
  }, [parsedMessage]);

  return (
    <Button disabled={disabled} onClickButton={sendAnswer} className={styles.button}>
      {'Я знаю ответ!'}
    </Button>
  );
};
