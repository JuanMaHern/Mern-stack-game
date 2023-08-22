import Inventori from "./Inventori"
import WorldConfig from "../JSON/WorldConfig.json"
import { useState } from "react"
import { DbToInv } from "../Scripts/InventoriControl"
import ItemMenu from "./ItemMenu"
import InfoWindow from "./InfoWindow"

const Shop = ({ player, setPlayer, setBlurWindow, dWindow }) => {

    const [iMenu, setIMenu] = useState(null)
    const handleInfoWindow = (item) => {
        setIMenu(null)
        setBlurWindow(<InfoWindow item={item} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />)
    }
    const handleIMenu = (item) => {
        setIMenu(<ItemMenu item={item} pos={{ x: event.x, y: event.y }} player={player} setPlayer={setPlayer} setIMenu={setIMenu} handleInfoWindow={handleInfoWindow} dWindow={dWindow} />)
    }

    return (
        <div className="shop">
            <Inventori inventori={DbToInv(WorldConfig[0].Shop, 'S')} invCap={20} source={'S'} handleIMenu={handleIMenu} />
            {iMenu}
        </div> 
    )
}
export default Shop