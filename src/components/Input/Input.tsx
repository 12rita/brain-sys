import {ChangeEvent, FC, InputHTMLAttributes, useCallback} from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement>{
    value: string
    onChangeInput: (value: string) => void
    className?: string;
}

export const Input: FC<IInput> = ({value, onChangeInput, className, ...otherProps}) => {

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChangeInput(e.target?.value)
    }, [onChangeInput]);

    return (
        <input className={className} value={value} onChange={handleChange} {...otherProps} />
    )
}

