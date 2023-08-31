import Player from "../JSON/Player.json"
import { useRef, useState, useEffect } from 'react'
import MainWindow from "./MainWindow"
import { Time } from "../Scripts/Time"


const App =() => {
    const user = useRef(Player[0])
    const [now, setNow] = useState(Time())
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Time())
        }, 1000);
    }, [])
    
    return(
        <div>
            <MainWindow user={user} now={now} />
        </div>
    )
}
export default App