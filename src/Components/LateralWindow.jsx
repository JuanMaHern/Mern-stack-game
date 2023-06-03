import { useState } from "react"
import Inventori from "./Inventori"
import ItemMenu from "./ItemMenu"
import InfoWindow from "./InfoWindow"

const LateralWindow = ({ player, setPlayer, setBlurWindow }) => {
    const [iMenu, setIMenu] = useState(null)
    const handleInfoWindow = (item) => {
        setIMenu(null)
        setBlurWindow(<InfoWindow item={item} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />)
    }
    const handleIMenu = (item) => {
        setIMenu(<ItemMenu item={item} pos={{x: event.x, y: event.y}} player={player} setPlayer={setPlayer} setIMenu={setIMenu} handleInfoWindow={handleInfoWindow} />)
    }
    return(
        <div className="lateralWindow">
            <span className="avatar" ><img  src={player.character.avatar} alt={player.character.name} /></span>
            <span>{player.character.name}</span>
            <span>Pv: {player.character.pv} / {player.character.maxPv}</span>
            <span>Level: {player.character.lvl}</span>
            <span>Exp: {player.character.exp}/{100*player.character.lvl*player.character.lvl}</span>
            <span>Damage: {player.character.dmg}</span>
            <span>Defense: {player.character.def}</span>
            <span>Gold: {player.character.gold}</span>
            <span>Equipment
            <Inventori inventori={player.character.equipment} invCap={10} handleIMenu={handleIMenu} />
            </span>
            <span>Inventori {player.character.inventori.length}/{player.character.invCap}</span>
            <Inventori inventori={player.character.inventori} invCap={player.character.invCap} handleIMenu={handleIMenu} />
            {iMenu}
        </div>
    )
}
export default LateralWindow