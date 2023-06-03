import { EquipAtribCalc } from "../Scripts/EquipAtribCalc"
import { Equip, Unequip, Use } from "../Scripts/ItemActions"

const ItemMenu = ({ item, pos, player, setPlayer, setIMenu, handleInfoWindow }) => {
    const action = item.type === 'Consumable' ?
        <span onClick={() => handleAction('consumable')} >Use</span> :
        item.type === 'Material' ? null :
            <span onClick={() => handleAction(item.inv)} >{item.inv === 'I' ? 'Equip' : 'Unequip'}</span>
    const handleAction = (type) => {
        if (type === 'consumable') {
            setPlayer(Use(item, player))
            setIMenu(null)
        }
        if (type === 'I') {
            setPlayer(EquipAtribCalc(Equip(item, player)))
            setIMenu(null)
        }
        if (type === 'E') {
            setPlayer(EquipAtribCalc(Unequip(item, player)))
            setIMenu(null)
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