import { useState } from "react"
import DisplayWindow from "./DisplayWindow"
import LateralWindow from "./LateralWindow"
import NavBar from "./NavBar"
import { EquipAtribCalc } from "../Scripts/EquipAtribCalc"
import { DbtoInvPlayer } from "../Scripts/DbtoInvPlayer"

const MainWindow = ({ user, enemi }) => {
    const [player, setPlayer] = useState(EquipAtribCalc(DbtoInvPlayer(user.current)))
    const [dWindow, setDWindow] = useState('main')
    const [infoWindow, setInfoWindow] = useState(null)
    console.log(player)
    return(
        <div className="mainWindow">
            <NavBar setDWindow={setDWindow} />
            <DisplayWindow player={player} dWindow={dWindow} />
            <LateralWindow player={player} setPlayer={setPlayer} setInfoWindow={setInfoWindow}/>
            {infoWindow}
        </div>
    )
}
export default MainWindow