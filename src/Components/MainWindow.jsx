import { useState } from "react"
import DisplayWindow from "./DisplayWindow"
import LateralWindow from "./LateralWindow"
import NavBar from "./NavBar"

const MainWindow = ({ now, player, setPlayer, dWindow, setDWindow }) => {
    const [blurWindow, setBlurWindow] = useState(null)
    if (player.character.inventori.length > player.character.invCap){
        console.log("Te pasaste tio")
    }
    return(
        <div className="mainWindow">
            <NavBar setDWindow={setDWindow} now={now} />
            <DisplayWindow player={player} setPlayer={setPlayer} dWindow={dWindow} setBlurWindow={setBlurWindow} setDWindow={setDWindow} now={now} />
            <LateralWindow player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} dWindow={dWindow} now={now} />
            {blurWindow}
        </div>
    )
}
export default MainWindow