import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { IResult, useWebSocketContext } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '../../routes.ts';
import { Button } from '../../components';

export const Admin = () => {
  const navigate = useNavigate();
  const { isConnected, isAdmin, parsedMessage, sendMessage } = useWebSocketContext();
  const [results, setResults] = useState([] as IResult[]);

  useEffect(() => {
    if (!isConnected) navigate(ERoutes.CONNECT);
    else if (isConnected && !isAdmin) navigate(ERoutes.MAIN);
  }, [isAdmin, isConnected, navigate]);

  // const sendAnswer = useCallback(() => {
  //   sendMessage(JSON.stringify({ date: Date.now() }));

  // }, [sendMessage]);

  useEffect(() => {
    if (parsedMessage && 'results' in parsedMessage) {
      setResults(parsedMessage.results);
    }
  }, [parsedMessage]);

  const handleReset = () => {
    sendMessage(JSON.stringify({ reset: true }));
    setResults([]);
  };

  return (
    <div>
      <div className={styles.title}>Результаты:</div>
      {results.map((item, index) => {
        const { name, date } = item;
        const time = new Date(Number(date)).toLocaleTimeString();
        return (
          <div className={styles.tableItem} key={`${item.name}+${index}`}>
            <div>{index + 1}</div>
            <div>{name}</div>
            <div>{time}</div>
          </div>
        );
      })}
      <Button className={styles.button} onClickButton={handleReset}>
        Сброс
      </Button>
    </div>
  );
};
