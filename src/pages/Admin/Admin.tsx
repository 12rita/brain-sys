import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { IResult, IUser, useNoReturn, useWebSocketContext } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { ERoutes } from '../../routes.ts';
import { Button } from '../../components';
import { Table } from '../../components/Table';
import notification from '../../assets/audio/tethys.mp3';

import useSound from 'use-sound';

import { userColumns, useUserRows } from './useUserRows.tsx';
import { resultColumns, useResultRows } from './useResultRows.tsx';
import { ActionsBlock } from './ActionsBlock.tsx';

export const Admin = () => {
  const { isConnected, isAdmin, parsedMessage, sendJsonMessage } = useWebSocketContext();
  const [results, setResults] = useState([] as IResult[]);
  const [users, setUsers] = useState([] as IUser[]);
  const [playNotification] = useSound(notification);
  const [disableSound, setDisableSound] = useState(false);

  useNoReturn();

  const { userRows } = useUserRows({ users, sendJsonMessage });
  const { resultRows } = useResultRows({ results });

  useEffect(() => {
    if (!parsedMessage) return;
    if ('results' in parsedMessage) {
      !disableSound && playNotification();
      setResults(parsedMessage.results);
    } else if ('users' in parsedMessage) {
      setUsers(parsedMessage.users);
    }
  }, [disableSound, parsedMessage, playNotification]);

  const handleReset = () => {
    sendJsonMessage && sendJsonMessage({ reset: true });
    setResults([]);
  };

  if (!isConnected) {
    return <Navigate to={ERoutes.CONNECT} />;
  }
  if (!isAdmin) {
    return <Navigate to={ERoutes.MAIN} />;
  }

  const handleToggleSound = () => {
    setDisableSound(!disableSound);
  };

  return (
    <div className={styles.container}>
      <ActionsBlock soundDisabled={disableSound} onToggleSound={handleToggleSound} />
      <div className={styles.wrapper}>
        <div>
          <div className={styles.title}>Кто подключился:</div>
          <Table columns={userColumns} rows={userRows} />
        </div>
        <div>
          <div className={styles.title}>Результаты:</div>
          <Table columns={resultColumns} rows={resultRows} />
          <Button className={styles.button} onClickButton={handleReset}>
            Сброс
          </Button>
        </div>
      </div>
    </div>
  );
};
