import { useMemo } from 'react';
import styles from './styles.module.css';
import closeLight from '../../assets/closeLight.svg';
import closeDark from '../../assets/closeDark.svg';
import { IUser, useIsDarkMode } from '../../hooks';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { IRow } from '../../components/Table';

export const userColumns = [
  { id: 'number', title: 'Номер' },
  { id: 'name', title: 'Имя' },
  { id: 'close', title: '' }
];

export interface IUserRows extends IRow {
  number: number;
  name: string;
  close: JSX.Element;
}

export type TUseUserRows = ({
  users,
  sendJsonMessage
}: {
  users: IUser[];
  sendJsonMessage: SendJsonMessage | undefined;
}) => {
  userRows: IUserRows[];
};

export const useUserRows: TUseUserRows = ({ users, sendJsonMessage }) => {
  const { theme } = useIsDarkMode();

  const userRows = useMemo(() => {
    return users?.map((user, idx) => {
      const handleClose = () => {
        sendJsonMessage && sendJsonMessage({ close: true, id: user.id });
      };

      const closeIcon = (
        <img
          className={`${styles.closeIcon}`}
          src={theme === 'dark' ? closeLight : closeDark}
          alt={'close-icon'}
          onClick={handleClose}
        />
      );
      return { ...user, number: idx + 1, close: closeIcon };
    });
  }, [users, theme, sendJsonMessage]);

  return { userRows };
};
