import { useState } from "react"
import DisplayWindow from "./DisplayWindow"
import LateralWindow from "./LateralWindow"
import NavBar from "./NavBar"
import { EquipAtribCalc } from "../Scripts/PlayerControl"
import { DbtoInvPlayer } from "../Scripts/InventoriControl"

const MainWindow = ({ user, enemi }) => {
    const [player, setPlayer] = useState({...EquipAtribCalc(DbtoInvPlayer(user.current)), shop:[]})
    const [dWindow, setDWindow] = useState('main')
    const [blurWindow, setBlurWindow] = useState(null)
    console.log(player)
    return(
        <div className="mainWindow">
            <NavBar setDWindow={setDWindow} />
            <DisplayWindow player={player} setPlayer={setPlayer} dWindow={dWindow} setBlurWindow={setBlurWindow} />
            <LateralWindow player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} dWindow={dWindow} />
            {blurWindow}
        </div>
    )
}
export default MainWindow