import { Equip, Unequip } from "../Scripts/ItemActions"

const ItemMenu = ({ item, pos, player, setPlayer, setIMenu, handleInfoWindow }) => {
    const handleEquipment = () => {
        if (item.inv === 'I'){
            setPlayer(Equip(item, player))
            setIMenu(null)
        } else{
            setPlayer(Unequip(item, player))
            setIMenu(null)
        }
    }
    return (
        <div className="itemMenu" style={{top: pos.y, left: pos.x-70}}>
            <span onClick={() => handleEquipment()} >{item.inv === 'I'? 'Equip': 'Unequip'}</span>
            <span onClick={() => handleInfoWindow(item)}>Info</span>
            <span>Sell</span>
            <span>Delete</span>
            <span onClick={() => setIMenu(null)}>Close</span>
        </div>
    )
}
export default ItemMenu