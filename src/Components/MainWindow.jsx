import { useState } from "react"
import DisplayWindow from "./DisplayWindow"
import LateralWindow from "./LateralWindow"
import NavBar from "./NavBar"

const MainWindow = ({ user, enemi, itemDb }) => {
    const [player, setPlayer] = useState(user.current)
    const [dWindow, setDWindow] = useState('main')
    return(
        <div className="mainWindow">
            <NavBar setDWindow={setDWindow} />
            <DisplayWindow player={player} dWindow={dWindow} />
            <LateralWindow />
        </div>
    )
}
export default MainWindow