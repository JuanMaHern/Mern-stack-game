import { InvTypeFilter } from "../Scripts/InventoriControl"
import Inventori from "./Inventori"
import Resources from "../JSON/Resources.json"

const FarmSlot = ({ player, setPlayer, slot }) => {
    let auxFarm = player.character.farm
    let auxInv = InvTypeFilter(player.character.inventori, "Seed")
    let auxResource = undefined
    if(auxFarm[slot] !== undefined){
        auxResource = Resources.find(elem => elem.id === auxFarm[slot].resourceId)
    }
    console.log(auxResource)
    return (
        <div className="blur">
            <div className="farmSlotContainer">
                <div className="farmSlot" >
                    {auxResource !== undefined? <div className="avatar" ><img src={auxResource.img} alt={auxResource.name} /></div> : null}
                </div>
                <div className="farmSlotInventori">
                    <Inventori inventori={auxInv} invCap={10} source={'F'} />
                </div>

            </div>
        </div>
    )
}
export default FarmSlot