import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import QrScanner from 'qr-scanner';
import QrFrame from '../../assets/qr-frame.svg';

interface IQrReader {
  setScannedResult: Dispatch<SetStateAction<string>>;
  onClose?: () => void;
}

export const QrReader: FC<IQrReader> = ({ setScannedResult, onClose }) => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Success
  const onScanSuccess = useCallback(
    (result: QrScanner.ScanResult) => {
      setScannedResult(result?.data || '');
      scanner.current?.stop();
      onClose && onClose();
    },
    [onClose, setScannedResult]
  );

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined
      });

      scanner?.current
        ?.start()
        .then(() => {
          setQrOn(true);
        })
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, [onScanSuccess]);

  useEffect(() => {
    if (!qrOn)
      alert(
        'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.'
      );
  }, [qrOn]);

  return (
    <div className={styles.qrReader}>
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className={styles.qrBox}>
        <img src={QrFrame} alt="Qr Frame" width={256} height={256} className={styles.qrFrame} />
      </div>
    </div>
  );
};
