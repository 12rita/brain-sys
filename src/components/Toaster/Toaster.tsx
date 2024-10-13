import {FC} from 'react'
import styles from './styles.module.css';
import {useToaster} from "../../hooks";


export const Toaster: FC = () => {

    const {message} = useToaster();


    const {title, text} = message;


    return (
        <div className={`${styles.wrapper} ${styles[title]}` } >
            {title}
            {text}
        </div>
    )
}

