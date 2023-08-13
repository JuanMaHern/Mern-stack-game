import { EquipAtribCalc } from "../Scripts/PlayerControl"
import { DeleteItem, Equip, Unequip, Use } from "../Scripts/ItemControl"
import SellWindow from "./SellWindow"

const ItemMenu = ({ item, pos, player, setPlayer, setIMenu, handleInfoWindow, dWindow }) => {
    console.log(item)
    const action = item.type === 'Consumable' ?
        <span onClick={() => handleAction('consumable')} >Use</span> :
        item.type === 'Material' ? null :
            <span onClick={() => handleAction(item.inv)} >{item.inv === 'I' ? 'Equip' : 'Unequip'}</span>
    const handleAction = (type) => {
        if (type === 'delete') {
            setPlayer(DeleteItem(item, player))
            setIMenu(null)
        }
        if (type === 'buy') {
            setIMenu(<SellWindow item={item} player={player} setPlayer={setPlayer} pos={pos} setIMenu={setIMenu} />)
        }
        if (type === 'sell') {
            setIMenu(<SellWindow item={item} player={player} setPlayer={setPlayer} pos={pos} setIMenu={setIMenu} />)
        }
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
            <span onClick={() => handleInfoWindow(item)}>Info</span>
            {item.inv === 'S' ?
                <>
                    <span onClick={() => handleAction('buy')}>Buy</span>
                </> :
                <>
                    {action}
                    {dWindow === 'Shop' ? <span onClick={() => handleAction('sell')}>Sell</span> : null}
                    <span onClick={() => handleAction('delete')}>Delete</span>
                </>
            }




            <span onClick={() => setIMenu(null)}>Close</span>
        </div>
    )
}
export default ItemMenu