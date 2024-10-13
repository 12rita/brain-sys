import {createContext, Dispatch, SetStateAction, useContext} from "react";

type TMessage = 'success' | 'error'

export interface IMessage {
    title: TMessage;
    text?: string
}

interface IToasterContext {
    message: IMessage;
    setMessage: Dispatch<SetStateAction<IMessage>>
}

export const ToasterContext = createContext<IToasterContext>({} as IToasterContext);

export const useToaster = () => useContext(ToasterContext);