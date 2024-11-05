import { useMemo } from 'react';

import { IResult } from '../../hooks';
import { IRow } from '../../components/Table';

export const resultColumns = [
  { id: 'number', title: 'Номер' },
  { id: 'name', title: 'Имя' },
  { id: 'time', title: 'Время' },
  { id: 'serverTime', title: 'Время с сервера' },
  { id: 'delta', title: 'Разница' }
];

export interface IResultRows extends IRow {
  name: string;
  time: string;
  serverTime: string;
  delta: number;
  number: number;
}

export type TUseResultRows = ({ results }: { results: IResult[] }) => {
  resultRows: IResultRows[];
};

export const useResultRows: TUseResultRows = ({ results }) => {
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

  return { resultRows };
};
