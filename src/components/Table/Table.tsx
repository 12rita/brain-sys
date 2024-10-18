import { FC } from 'react';
import styles from './styles.module.css';
import { ITable } from './types.ts';

export const Table: FC<ITable> = ({ columns, rows }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => {
            return <th key={column.id}>{column.title}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => {
          return (
            <tr key={idx}>
              {columns.map((column, index) => {
                return (
                  <td className={styles.td} key={`${column.id}-${index}`}>
                    {row[column.id]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
