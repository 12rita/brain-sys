import {FC} from 'react'

interface IButton {
    onClick: ()=>void;
    title: string;
    className?:string;
}

export const Button:FC<IButton> = ({onClick, title, className}) => {

  return (
    <button className={className} onClick={onClick}>
        {title}
    </button>
  )
}

