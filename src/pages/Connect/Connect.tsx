import { Button, Input } from '../../components';
import { useToaster, useWebSocketContext } from '../../hooks';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { ReadyState } from 'react-use-websocket';
import { ERoutes } from '../../routes.ts';

export const Connect = () => {
  const navigate = useNavigate();

  const { isConnected, sendJsonMessage, readyState, isAdmin, setOpenConnection } =
    useWebSocketContext();

  useEffect(() => {
    if (isConnected && isAdmin) navigate(ERoutes.ADMIN);
    else if (isConnected) navigate(ERoutes.MAIN);
  }, [isAdmin, isConnected, navigate]);

  const [name, setName] = useState('');
  const { setMessage } = useToaster();

  const disabled = !name || readyState === ReadyState.CONNECTING;

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage && sendJsonMessage({ name });
      setMessage({ title: 'success' });
      navigate(ERoutes.MAIN);
    } else if (readyState === ReadyState.CLOSED && !disabled) {
      setMessage({ title: 'error', text: 'Connecting problems' });
    }
  }, [name, navigate, readyState, setMessage, disabled, sendJsonMessage]);

  const connect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOpenConnection(true);
  };

  return (
    <div>
      <div className={styles.label}>Введите имя</div>
      <Input
        className={styles.input}
        value={name}
        onChangeInput={setName}
        placeholder="Введите ваше имя"
      />
      <Button
        disabled={disabled}
        className={`${styles.button} ${styles.connectButton}`}
        onClickButton={connect}>
        Подключиться
      </Button>
    </div>
  );
};
