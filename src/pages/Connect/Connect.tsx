import {Button, Input} from "../../components";
import {useAuth} from "../../hooks";
import {useState} from "react";
import styles from './styles.module.css'
import {useNavigate} from "react-router-dom";

export const Connect = ()=>{
    const [inputValue, setInputValue] = useState("");
    const {setConnected} = useAuth();
    const navigate = useNavigate()

    const connect = ()=>{
        setConnected(true);
        navigate('/main')

    }

    return <div>
        <div className={styles.label}>Введите IP</div>
        <Input className={styles.input} value={inputValue} onChange={setInputValue} />
        <Button className={styles.button} onClick={connect} title={'Подключиться'} />
    </div>
}
