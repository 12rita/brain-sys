import {useState} from 'react'
import './App.css'
import {Button} from "./components/Button";


function App() {
    const [count, setCount] = useState(0)
    return (
        <>
            <Button onClick={() => {
            }} title={'Я участник'}/>
        </>
    )
}

export default App