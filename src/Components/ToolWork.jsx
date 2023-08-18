import { AddtoInv } from "../Scripts/InventoriControl"
import { ResourceLoot } from "../Scripts/LootControl"

const ToolWork = ({ player, setPlayer, resource, handleWin, setBlurWindow }) => {
    const handleCollect = () => {
        let auxPlayer = JSON.parse(JSON.stringify(player))
        let auxInv = auxPlayer.character.inventori
        for (let item of ResourceLoot(resource.loot)) {
            auxInv = AddtoInv(auxInv, item)
        }
        auxPlayer.character.inventori = auxInv
        setPlayer(auxPlayer)
        handleWin()
        setBlurWindow(null)
    }
    return (
        <div className="blur">
            <div className="toolWork">
                <div className="avatar" ><img src={resource.img} alt={resource.name} /></div>
                <span className="exp-Back" style={{margin: "10px 0 5px 0"}} onClick={() => handleCollect()}>Collect</span>
                <span className="exp-Back" onClick={() => setBlurWindow(null)}>Close</span>
            </div>
        </div>
    )
}
export default ToolWork