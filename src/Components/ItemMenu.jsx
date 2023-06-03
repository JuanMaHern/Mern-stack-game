import { EquipAtribCalc } from "../Scripts/EquipAtribCalc"
import { Equip, Unequip } from "../Scripts/ItemActions"

const ItemMenu = ({ item, pos, player, setPlayer, setIMenu, handleInfoWindow }) => {
    const action = item.type === 'Consumable' ?
        <span onClick={() => handleAction()} >Use</span> :
        <span onClick={() => handleAction()} >{item.inv === 'I' ? 'Equip' : 'Unequip'}</span>
    const handleAction = () => {
        if (item.type === 'Consumable') {
            let auxPlayer = JSON.parse(JSON.stringify(player))
            if(auxPlayer.character.pv < auxPlayer.character.maxPv){
                auxPlayer.character.pv += item.action.amount 
                const auxItem = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(elem => elem.objectId === item.objectId))
                auxPlayer.character.inventori.splice(auxItem, 1)
                setPlayer(auxPlayer)
                setIMenu(null)
            }

        } else {
            if (item.inv === 'I') {
                setPlayer(EquipAtribCalc(Equip(item, player)))
                setIMenu(null)
            } else {
                setPlayer(EquipAtribCalc(Unequip(item, player)))
                setIMenu(null)
            }
        }
    }
    return (
        <div className="itemMenu" style={{ top: pos.y, left: pos.x - 70 }}>
            {action}
            <span onClick={() => handleInfoWindow(item)}>Info</span>
            <span>Sell</span>
            <span>Delete</span>
            <span onClick={() => setIMenu(null)}>Close</span>
        </div>
    )
}
export default ItemMenu