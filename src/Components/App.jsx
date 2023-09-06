import Player from "../JSON/Player.json"
import { useRef, useState, useEffect } from 'react'
import { EquipAtribCalc } from "../Scripts/PlayerControl"
import { DbtoInvPlayer } from "../Scripts/InventoriControl"
import MainWindow from "./MainWindow"
import { Time } from "../Scripts/Time"
import AuxNavbar from "./AuxNavbar"
import NavBar from "./NavBar"


const App =() => {
    const user = useRef(Player[0])
    const [player, setPlayer] = useState(EquipAtribCalc(DbtoInvPlayer(user.current)))
    const [dWindow, setDWindow] = useState('main')
    const [now, setNow] = useState(Time())
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Time())
        }, 1000);
    }, [])
    
    return(
        <div className="app">
            <MainWindow now={now} player={player} setPlayer={setPlayer} dWindow={dWindow} setDWindow={setDWindow} />
        </div>
    )
}
export default App