import {Button, Input} from "../../components";
import {useToaster, useWebSocketContext} from "../../hooks";
import React, {useEffect, useState} from "react";
import styles from './styles.module.css'
import {useNavigate} from "react-router-dom";
import {ReadyState} from "react-use-websocket";
import {ERoutes} from "../../routes.ts";


export const Connect = () => {
    const navigate = useNavigate();
    const {isConnected, setUrl, sendMessage, readyState} = useWebSocketContext();

    useEffect(() => {
        if (isConnected) navigate(ERoutes.MAIN)
    }, [isConnected, navigate]);

    const [urlValue, setUrlValue] = useState("");
    const [name, setName] = useState("");

    const {setMessage} = useToaster();


    const disabled = !urlValue || !name || readyState === ReadyState.CONNECTING;


    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            setMessage({title: 'success'});
            navigate('/main')
        } else if ((readyState === ReadyState.CLOSED) && urlValue) {
            setMessage({title: 'error', text: 'Connecting problems'});
            setUrl('');
        }

    }, [urlValue, navigate, readyState, setMessage, setUrl])

    const connect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setUrl(urlValue);
        sendMessage(JSON.stringify({name}));
    }


    return (<form>
        <div className={styles.label}>Введите URL</div>
        <Input className={styles.input} type='text' inputMode={"numeric"} value={urlValue}
               onChangeInput={setUrlValue}
               placeholder={'Введите URL'}/>
        <div className={styles.label}>Введите имя</div>
        <Input className={styles.input} value={name} onChangeInput={setName} placeholder={'Введите ваше имя'}/>
        <Button type='submit' disabled={disabled} className={styles.button} onClickButton={connect}
                title={'Подключиться'}/>
    </form>)
}
