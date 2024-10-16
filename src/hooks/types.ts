export interface IResult {
  name: string;
  date: string;
}

export interface IResultsData {
  results: IResult[];
}
export interface IAdminData {
  isAdminRole: boolean;
}
export interface IResetEvent {
  reset: boolean;
}

export type IServerResponse = IResultsData | IAdminData | IResetEvent;
