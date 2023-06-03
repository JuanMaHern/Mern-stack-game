import { useState } from "react"
import DisplayWindow from "./DisplayWindow"
import LateralWindow from "./LateralWindow"
import NavBar from "./NavBar"
import { EquipAtribCalc } from "../Scripts/EquipAtribCalc"
import { DbtoInvPlayer } from "../Scripts/DbtoInvPlayer"

const MainWindow = ({ user, enemi }) => {
    const [player, setPlayer] = useState(EquipAtribCalc(DbtoInvPlayer(user.current)))
    const [dWindow, setDWindow] = useState('main')
    const [blurWindow, setBlurWindow] = useState(null)
    return(
        <div className="mainWindow">
            <NavBar setDWindow={setDWindow} />
            <DisplayWindow player={player} setPlayer={setPlayer} dWindow={dWindow} setBlurWindow={setBlurWindow} />
            <LateralWindow player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow}/>
            {blurWindow}
        </div>
    )
}
export default MainWindow