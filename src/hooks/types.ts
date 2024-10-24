export interface IResult {
  name: string;
  date: string;
  serverDate: string;
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

export interface IUser {
  name: string;
  id: string;
}

export interface IUserData {
  users: IUser[];
}

export type IServerResponse = IResultsData | IAdminData | IResetEvent | IUserData;
