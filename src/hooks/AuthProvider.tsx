import {
    createContext, Dispatch,
    ReactNode, SetStateAction,
    useState
} from 'react';


interface IAuthContext {
    isConnected: boolean;
    setConnected: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({children}: { children?: ReactNode }) => {
    const [isConnected, setConnected] = useState(false);


    return (
        <AuthContext.Provider
            value={{
                isConnected,
                setConnected
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

