import styles from './styles.module.css';
import { useEffect, useMemo, useState } from 'react';
import { IResult, IUser, useIsDarkMode, useNoReturn, useWebSocketContext } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { ERoutes } from '../../routes.ts';
import { Button } from '../../components';
import { Table } from '../../components/Table';
import closeLight from '../../assets/closeLight.svg';
import closeDark from '../../assets/closeDark.svg';

const userColumns = [
  { id: 'number', title: 'Номер' },
  { id: 'name', title: 'Имя' },
  { id: 'close', title: '' }
];

const resultColumns = [
  { id: 'number', title: 'Номер' },
  { id: 'name', title: 'Имя' },
  { id: 'time', title: 'Время' },
  { id: 'serverTime', title: 'Время с сервера' },
  { id: 'delta', title: 'Разница' }
];

export const Admin = () => {
  const { isConnected, isAdmin, parsedMessage, sendJsonMessage } = useWebSocketContext();
  const [results, setResults] = useState([] as IResult[]);
  const [users, setUsers] = useState([] as IUser[]);
  const { theme } = useIsDarkMode();
  useNoReturn();

  const userRows = useMemo(() => {
    return users?.map((user, idx) => {
      const handleClose = () => {
        sendJsonMessage && sendJsonMessage({ close: true, id: user.id });
      };

      const closeIcon = (
        <img
          className={styles.closeIcon}
          src={theme === 'dark' ? closeLight : closeDark}
          alt={'close-icon'}
          onClick={handleClose}
        />
      );
      return { ...user, number: idx + 1, close: closeIcon };
    });
  }, [users, theme, sendJsonMessage]);

  const resultRows = useMemo(() => {
    return results.map((item, index) => {
      const { name, date, serverDate } = item;
      const dateObj = new Date(Number(date));
      const time = dateObj.toLocaleTimeString() + ' ' + dateObj.getMilliseconds();
      const serverDateObj = new Date(Number(serverDate));
      const serverTimeConverted =
        serverDateObj.toLocaleTimeString() + ' ' + serverDateObj.getMilliseconds();
      return {
        name,
        time,
        serverTime: serverTimeConverted,
        delta: Number(serverDate) - Number(date),
        number: index + 1
      };
    });
  }, [results]);

  useEffect(() => {
    if (!parsedMessage) return;
    if ('results' in parsedMessage) {
      setResults(parsedMessage.results);
    } else if ('users' in parsedMessage) {
      setUsers(parsedMessage.users);
    }
  }, [parsedMessage]);

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

  return (
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
  );
};
