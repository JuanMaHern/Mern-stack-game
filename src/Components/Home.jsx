import { useEffect, useState } from "react"
import Inventori from "./Inventori"
import WorkStation from "./WorkStation"
import { Time } from "../Scripts/Time"
import { CraftInv } from "../Scripts/ItemControl"
import { GiAnvil } from "react-icons/gi"
import FarmSlot from "./FarmSlot"
import { FetchResources } from "../Scripts/Home"


const Home = ({ player, setPlayer, setBlurWindow, now }) => {
    let resources = FetchResources(player.character.farm)

    const handleMenu = (term) => {
        setBlurWindow(<WorkStation player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} term={term} />)
    }
    const handleItem = (item) => {
        setPlayer(CraftInv(player, item))
    }
    const handleFarm = (slot) => {
        setBlurWindow(<FarmSlot player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} slot={slot}/>)
    }
    return (
        <div className="home">
            <span className="separator"> Farm Area </span>
            <span className="homeSection">
                <span className="homeFrmSpot" onClick={() => handleFarm(0)}>{resources[0] !== 0? <div className="avatar" ><img src={resources[0].img} alt={resources[0].name} /></div>: null}</span>
                <span className="homeFrmSpot" onClick={() => handleFarm(1)}></span>
                <span className="homeFrmSpot" onClick={() => handleFarm(2)}></span>
                <span className="homeFrmSpot" onClick={() => handleFarm(3)}></span>
                <span className="homeFrmSpot" onClick={() => handleFarm(4)}></span>
                <span className="homeFrmSpot" onClick={() => handleFarm(5)}></span>
            </span>
            <span className="separator"> Work Area </span>
            <span className="homeSection">
                <span className="homeButton" onClick={() => handleMenu('Smelter')} >Smelter</span>
                <span className="homeButton" onClick={() => handleMenu('Sawmill')} >Sawmill</span>
                <span className="homeButton" onClick={() => handleMenu('Skining Rack')} >Skining Rack</span>
            </span>
            <span className="homeSection">
                <span className="homeButton" onClick={() => handleMenu('Loom')} >Loom</span>
                <span className="homeButton" onClick={() => handleMenu('Stone Cutter')} >Stone Cutter</span>
                <span className="homeButton" onClick={() => handleMenu('Forge')} ><GiAnvil /> Forge</span>
            </span>
            <span className="homeSection">
                <span className="homeButton" onClick={() => handleMenu('Furnace')} >Furnace</span>
                <span className="homeButton" onClick={() => handleMenu('Cauldron')} >Cauldron</span>
                <span className="homeButton" onClick={() => handleMenu('Work Station')} >Work Station</span>
            </span>
            <span className="homeSection">
                <span className="homeInventori" >
                    <Inventori inventori={player.character.craft} invCap={5} handleIMenu={handleItem} source={'C'} now={now.time} />
                </span>
            </span>
        </div>
    )
}
export default Home