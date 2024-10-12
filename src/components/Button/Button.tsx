import {FC} from 'react'

interface IButton {
    onClick: ()=>void;
    title: string;
}
export const Button:FC<IButton> = ({onClick, title}) => {

  return (
    <button onClick={onClick}>
        {title}
    </button>
  )
}

