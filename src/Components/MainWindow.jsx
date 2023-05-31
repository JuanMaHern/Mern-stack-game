import { useState } from "react"
import DisplayWindow from "./DisplayWindow"
import LateralWindow from "./LateralWindow"
import NavBar from "./NavBar"

const MainWindow = ({ user, enemi }) => {
    const [player, setPlayer] = useState(user.current)
    const [dWindow, setDWindow] = useState('main')
    const [infoWindow, setInfoWindow] = useState(null)
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