import {Button, Input} from "../../components";
import {useAuth, useToaster} from "../../hooks";
import {useEffect, useState} from "react";
import styles from './styles.module.css'
import {useNavigate} from "react-router-dom";
import useWebSocket, {ReadyState} from "react-use-websocket";

export const Connect = () => {
    const [ip, setIp] = useState("");
    const [name, setName] = useState("");
    const {setConnected} = useAuth();
    const {setMessage} = useToaster();
    const navigate = useNavigate();
    const socketUrl = 'ws://localhost:1000';

    const {sendMessage, readyState} = useWebSocket(socketUrl);

    const disabled = !ip || !name || readyState === ReadyState.CONNECTING;

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    // }[readyState];

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            setMessage({title: 'success'});
            setConnected(true);
            navigate('/main')
        } else if (readyState === ReadyState.UNINSTANTIATED || readyState === ReadyState.CLOSED) {
            setMessage({title: 'error'});
        }

    }, [navigate, readyState, setConnected, setMessage])

    const connect = () => {
        sendMessage(name);
        console.debug(readyState)
    }




    return <div>
        <div className={styles.label}>Введите IP</div>
        <Input className={styles.input} value={ip} onChangeInput={setIp} placeholder={'Введите IP'}/>
        <div className={styles.label}>Введите имя</div>
        <Input className={styles.input} value={name} onChangeInput={setName} placeholder={'Введите ваше имя'}/>
        <Button disabled={disabled} className={styles.button} onClick={connect}
                title={'Подключиться'}/>
    </div>
}
