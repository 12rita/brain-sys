import styles from './styles.module.css'
import {useCallback} from "react";


export const Main = () => {

    const sendAnswer = useCallback(()=>{

    },[])

    return <button onClick={sendAnswer} className={styles.button}>Я знаю ответ! </button>

}
