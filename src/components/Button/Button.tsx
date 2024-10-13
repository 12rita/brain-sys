import {FC, useCallback} from 'react'
import styles from './styles.module.css';

interface IButton {
    onClick: () => void;
    title: string;
    className?: string;
    disabled?: boolean;
}

export const Button: FC<IButton> = ({onClick, title, className, disabled = false}) => {

    const handleClick = useCallback(() => {
        if (disabled) return;
        onClick()
    }, [disabled, onClick])

    return (
        <button className={`${className} ${disabled ? styles.disabled : ''}`} onClick={handleClick}>
            {title}
        </button>
    )
}

