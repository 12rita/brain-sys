import {ChangeEvent, FC, useCallback} from 'react'

interface IInput {
    value: string
    onChange: (value: string) => void
    className?: string;
}

export const Input: FC<IInput> = ({value, onChange, className}) => {

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target?.value)
    }, [onChange]);

    return (
        <input className={className} value={value} onChange={onChangeInput}/>
    )
}

