import { Button, Input } from '../../components';
import { useIsMobile, useToaster, useWebSocketContext } from '../../hooks';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { ReadyState } from 'react-use-websocket';
import { ERoutes } from '../../routes.ts';
import { QrReader } from '../../components';
import scanSVG from '../../assets/qrIcon.svg';
import { prepareURL } from '../../utils';

export const Connect = () => {
  const navigate = useNavigate();
  const { isConnected, setUrl, sendMessage, readyState, isAdmin } = useWebSocketContext();

  useEffect(() => {
    if (isConnected && isAdmin) navigate(ERoutes.ADMIN);
    else if (isConnected) navigate(ERoutes.MAIN);
  }, [isAdmin, isConnected, navigate]);

  const [urlValue, setUrlValue] = useState('');
  const [name, setName] = useState('');
  const [isOpenQRScan, setOpenQRScan] = useState(false);
  const { setMessage } = useToaster();
  const { isMobile } = useIsMobile();

  const scanButtonContent = isMobile ? (
    <img width={30} height={30} alt={'scanIcon'} src={scanSVG} />
  ) : (
    'QR'
  );

  const disabled = !urlValue || !name || readyState === ReadyState.CONNECTING;

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setMessage({ title: 'success' });
      navigate(ERoutes.MAIN);
    } else if (readyState === ReadyState.CLOSED && urlValue && !disabled) {
      setMessage({ title: 'error', text: 'Connecting problems' });
      setUrl('');
    }
  }, [urlValue, navigate, readyState, setMessage, setUrl, disabled]);

  const connect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setUrl(prepareURL(urlValue));
    sendMessage(JSON.stringify({ name }));
  };

  const toggleScanner = () => {
    setOpenQRScan((prevState) => !prevState);
  };

  return (
    <div>
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
        className={`${styles.button} ${styles.connectButton}`}
        onClickButton={connect}>
        Подключиться
      </Button>
    </div>
  );
};
