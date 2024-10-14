import styles from './styles.module.css'
import {useCallback, useEffect} from "react";
import {useWebSocketContext} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {ERoutes} from "../../routes.ts";



export const Main = () => {
    const navigate = useNavigate();
    const {isConnected} = useWebSocketContext();

    useEffect(() => {
        if (!isConnected) navigate(ERoutes.CONNECT)
    }, [isConnected, navigate]);


    const sendAnswer = useCallback(() => {

    }, [])

    return <button onClick={sendAnswer} className={styles.button}>Я знаю ответ! </button>

}
