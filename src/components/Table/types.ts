export interface IRow {
  [key: string]: string | number | JSX.Element;
}

export interface IColumn {
  id: string;
  title: string;
}

export interface ITable {
  columns: IColumn[];
  rows: IRow[];
}
