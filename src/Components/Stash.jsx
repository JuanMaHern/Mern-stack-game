import Inventori from "./Inventori"
import { useState } from "react"
import { DbToInv } from "../Scripts/InventoriControl"
import ItemMenu from "./ItemMenu"
import InfoWindow from "./InfoWindow"

const Stash = ({ player, setPlayer, setBlurWindow }) => {

    const [iMenu, setIMenu] = useState(null)
    const handleInfoWindow = (item) => {
        setIMenu(null)
        setBlurWindow(<InfoWindow item={item} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />)
    }
    const handleIMenu = (item) => {
        console.log(item)
        setIMenu(<ItemMenu item={item} pos={{ x: event.x, y: event.y }} player={player} setPlayer={setPlayer} setIMenu={setIMenu} handleInfoWindow={handleInfoWindow} />)
    }

    return(
        <div className="stash">
            <Inventori inventori={DbToInv(player.character.stash, 'PS')} invCap={100} source={'PS'} handleIMenu={handleIMenu} />
            {iMenu}
        </div>
    )
}
export default Stash