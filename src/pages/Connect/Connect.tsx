import {Button, Input} from "../../components";
import {useAuth, useToaster} from "../../hooks";
import React, {useEffect, useMemo, useState} from "react";
import styles from './styles.module.css'
import {useNavigate} from "react-router-dom";
import useWebSocket, {ReadyState} from "react-use-websocket";

const ipRegex = '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}'

export const Connect = () => {
    const [ip, setIp] = useState("");
    const [name, setName] = useState("");
    const [openConnection, setOpenConnection] = useState(false);
    const {setConnected} = useAuth();
    const {setMessage} = useToaster();
    const navigate = useNavigate();
    const socketUrl = `ws://${ip}`;


    const {sendMessage, readyState} = useWebSocket(socketUrl, {share: true}, openConnection);

    const isIpValid = useMemo(() => {
        const regexp = new RegExp(ipRegex);
        return regexp.test(ip);
    }, [ip]);

    const disabled = !ip || !name || !isIpValid || readyState === ReadyState.CONNECTING;

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
            setMessage({title: 'error', text: 'Connecting problems'});
            setOpenConnection(false);
        }

    }, [navigate, readyState, setConnected, setMessage])

    const connect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setOpenConnection(true);
        sendMessage(name);
        console.debug(readyState)
    }


    return (<form>
        <div className={styles.label}>Введите IP</div>
        <Input className={styles.input} type='text' inputMode={"numeric"} value={ip} pattern={ipRegex}
               onChangeInput={setIp}
               placeholder={'Введите IP'}/>
        <div className={styles.label}>Введите имя</div>
        <Input className={styles.input} value={name} onChangeInput={setName} placeholder={'Введите ваше имя'}/>
        <Button type='submit' disabled={disabled} className={styles.button} onClickButton={connect}
                title={'Подключиться'}/>
    </form>)
}
