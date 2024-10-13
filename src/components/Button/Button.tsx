import React, {ButtonHTMLAttributes, FC, useCallback} from 'react'
import styles from './styles.module.css';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClickButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    title: string;
    className?: string;
    disabled?: boolean;
}

export const Button: FC<IButton> = ({onClickButton, title, className, disabled = false, ...otherProps}) => {

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (disabled) return;
        onClickButton(e)
    }, [disabled, onClickButton])

    return (
        <button className={`${className} ${disabled ? styles.disabled : ''}`} onClick={handleClick} {...otherProps}>
            {title}
        </button>
    )
}

