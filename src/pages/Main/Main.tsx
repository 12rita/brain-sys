import styles from './styles.module.css';
import { useCallback, useEffect } from 'react';
import { useWebSocketContext } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../../routes.ts';
import { Button } from '../../components';

export const Main = () => {
  const navigate = useNavigate();
  const { isConnected, sendMessage } = useWebSocketContext();

  useEffect(() => {
    if (!isConnected) navigate(ERoutes.CONNECT);
  }, [isConnected, navigate]);

  const sendAnswer = useCallback(() => {
    sendMessage(JSON.stringify({ date: Date.now() }));
  }, [sendMessage]);

  return <Button onClickButton={sendAnswer} className={styles.button} title={'Я знаю ответ!'} />;
};
