import { useState } from "react"
import Inventori from "./Inventori"
import ItemMenu from "./ItemMenu"
import InfoWindow from "./InfoWindow"

const LateralWindow = ({ player, setPlayer, setInfoWindow }) => {
    const [iMenu, setIMenu] = useState(null)
    const handleInfoWindow = (item) => {
        setIMenu(null)
        setInfoWindow(<InfoWindow item={item} setPlayer={setPlayer} setInfoWindow={setInfoWindow} />)
    }
    const handleIMenu = (item) => {
        setIMenu(<ItemMenu item={item} pos={{x: event.x, y: event.y}} player={player} setPlayer={setPlayer} setIMenu={setIMenu} handleInfoWindow={handleInfoWindow} />)
    }
    return(
        <div className="lateralWindow">
            <span>Equipment</span>
            <Inventori inventori={player.character.equipment} invCap={10} handleIMenu={handleIMenu} />
            <span>Inventori {player.character.inventori.length}/{player.character.invCap}</span>
            <Inventori inventori={player.character.inventori} invCap={player.character.invCap} handleIMenu={handleIMenu} />
            {iMenu}
        </div>
    )
}
export default LateralWindow