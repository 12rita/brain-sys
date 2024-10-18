import styles from './styles.module.css';
import { useEffect, useMemo, useState } from 'react';
import { IResult, IUser, useWebSocketContext } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../../routes.ts';
import { Button } from '../../components';
import { Table } from '../../components/Table';

const userColumns = [
  { id: 'number', title: 'Номер' },
  { id: 'name', title: 'Имя' }
];

const resultColumns = [
  { id: 'number', title: 'Номер' },
  { id: 'name', title: 'Имя' },
  { id: 'time', title: 'Время' }
];

export const Admin = () => {
  const navigate = useNavigate();
  const { isConnected, isAdmin, parsedMessage, sendMessage } = useWebSocketContext();
  const [results, setResults] = useState([] as IResult[]);
  const [users, setUsers] = useState([] as IUser[]);

  useEffect(() => {
    if (!isConnected) navigate(ERoutes.CONNECT);
    else if (isConnected && !isAdmin) navigate(ERoutes.MAIN);
  }, [isAdmin, isConnected, navigate]);

  const userRows = useMemo(() => {
    return users?.map((user, idx) => ({ ...user, number: idx + 1 }));
  }, [users]);

  const resultRows = useMemo(() => {
    return results.map((item, index) => {
      const { name, date } = item;
      const dateObj = new Date(Number(date));
      const time = dateObj.toLocaleTimeString() + ' ' + dateObj.getMilliseconds();
      return {
        name,
        time,
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
    sendMessage(JSON.stringify({ reset: true }));
    setResults([]);
  };

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
