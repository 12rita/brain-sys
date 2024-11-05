import { Button, Input, QrReader } from '../../components';
import { useIsMobile, useToaster, useWebSocketContext } from '../../hooks';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { ReadyState } from 'react-use-websocket';
import { ERoutes } from '../../routes.ts';
import scanSVG from '../../assets/qrIcon.svg';

export const Connect = () => {
  const navigate = useNavigate();

  const { isConnected, sendJsonMessage, readyState, isAdmin, setOpenConnection, setURL } =
    useWebSocketContext();

  useEffect(() => {
    if (isConnected && isAdmin) navigate(ERoutes.ADMIN);
    else if (isConnected) navigate(ERoutes.MAIN);
  }, [isAdmin, isConnected, navigate]);

  const [name, setName] = useState('');
  const [manual, setManual] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const { setMessage } = useToaster();
  const [isOpenQRScan, setOpenQRScan] = useState(false);
  const { isMobile } = useIsMobile();

  const scanButtonContent = isMobile ? (
    <img width={30} height={30} alt={'scanIcon'} src={scanSVG} />
  ) : (
    'QR'
  );

  const manualButtonContent = manual ? 'Подключиться автоматически' : 'Ввести URL вручную';

  const disabled = useMemo(() => {
    const general = !name || readyState === ReadyState.CONNECTING;
    if (manual) return !urlValue || general;
    return general;
  }, [manual, name, readyState, urlValue]);

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
    if (manual) setURL(urlValue);
    else setOpenConnection(true);
  };

  const toggleScanner = () => {
    setOpenQRScan((prevState) => !prevState);
  };

  const toggleManual = () => {
    setManual(!manual);
  };

  return (
    <div>
      <Button
        className={`${styles.button} ${styles.manualButton} ${styles.manualLabel} ${styles.wideButton}`}
        onClickButton={toggleManual}>
        {manualButtonContent}
      </Button>
      {manual && (
        <>
          <div className={styles.label}>Введите URL</div>
          <div className={styles.urlBlock}>
            <Input
              className={styles.input}
              type="text"
              inputMode={'numeric'}
              value={urlValue}
              onChangeInput={setUrlValue}
              placeholder={'Введите URL'}
            />
            <Button className={styles.button} onClickButton={toggleScanner}>
              {scanButtonContent}
            </Button>
          </div>
        </>
      )}
      {isOpenQRScan && <QrReader setScannedResult={setUrlValue} onClose={toggleScanner} />}
      <div className={styles.label}>Введите имя</div>
      <Input
        className={styles.input}
        value={name}
        onChangeInput={setName}
        placeholder="Введите ваше имя"
      />
      <Button
        disabled={disabled}
        className={`${styles.button} ${styles.wideButton}`}
        onClickButton={connect}>
        Подключиться
      </Button>
    </div>
  );
};
