import { useEffect, useState } from "react"
import Inventori from "./Inventori"
import WorkStation from "./WorkStation"
import { Time } from "../Scripts/Time"
import { CraftInv } from "../Scripts/ItemControl"

const Home = ({ player, setPlayer, setBlurWindow, now }) => {

    const handleMenu = (term) => {
        setBlurWindow(<WorkStation player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} term={term} />)
    }
    const handleItem = (item) => {
        setPlayer(CraftInv(player, item))
    }
    return (
        <div className="home">
            <div className="home-navBar">
                <span onClick={() => handleMenu('Smelter')} >Smelter</span>
                <span onClick={() => handleMenu('Sawmill')} >Sawmill</span>
                <span onClick={() => handleMenu('Skining Rack')} >Skining Rack</span>
                <span onClick={() => handleMenu('Loom')} >Loom</span>
                <span onClick={() => handleMenu('Stone Cutter')} >Stone Cutter</span>
                <span onClick={() => handleMenu('Forge')} >Forge</span>
                <span onClick={() => handleMenu('Furnace')} >Furnace</span>
                <span onClick={() => handleMenu('Cauldron')} >Cauldron</span>
                <span onClick={() => handleMenu('Work Station')} >Work Station</span>
                <Inventori inventori={player.character.craft} invCap={5} handleIMenu={handleItem} source={'C'} now={now.time} />
            </div>
        </div>
    )
}
export default Home