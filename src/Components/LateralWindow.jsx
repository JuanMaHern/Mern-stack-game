import { useState } from "react"
import Inventori from "./Inventori"
import ItemMenu from "./ItemMenu"
import InfoWindow from "./InfoWindow"
import PlayerInfo from "./PlayerInfo"

const LateralWindow = ({ player, setPlayer, setBlurWindow, dWindow }) => {
    const [iMenu, setIMenu] = useState(null)
    const handleInfoWindow = (item) => {
        setIMenu(null)
        setBlurWindow(<InfoWindow item={item} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />)
    }
    const handleIMenu = (item) => {
        setIMenu(<ItemMenu item={item} pos={{ x: event.x, y: event.y }} player={player} setPlayer={setPlayer} setIMenu={setIMenu} handleInfoWindow={handleInfoWindow} dWindow={dWindow} />)
    }
    return (
        <div className="lateralWindow">
            <PlayerInfo player={player} />
            <div className="lateralInventori">
                <span>Equipment</span>
                <Inventori inventori={player.character.equipment} invCap={10} handleIMenu={handleIMenu} source={'E'} />
                <span>Inventori {player.character.inventori.length}/{player.character.invCap}</span>
                <Inventori inventori={player.character.inventori} invCap={player.character.invCap} handleIMenu={handleIMenu} source={'I'} />
            </div>
            {iMenu}
        </div>
    )
}
export default LateralWindow