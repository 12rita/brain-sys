export interface IRow {
  [key: string]: string | number;
}

export interface IColumn {
  id: string;
  title: string;
}

export interface ITable {
  columns: IColumn[];
  rows: IRow[];
}
