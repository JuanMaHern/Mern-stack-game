import { DeleteItem, Equip, Store, Take, Unequip, Use } from "../Scripts/ItemControl"
import SellWindow from "./SellWindow"

const ItemMenu = ({ item, pos, player, setPlayer, setIMenu, handleInfoWindow, dWindow }) => {
    const action = item.type === 'Consumable' ?
        <span onClick={() => handleAction('consumable')} >Use</span> :
        item.type === 'Material' ? null :
            <span onClick={() => handleAction(item.inv)} >{item.inv === 'I' ? 'Equip' : 'Unequip'}</span>
    const handleAction = (type) => {
        if (type === 'delete') {
            setPlayer(DeleteItem(item, player))
            setIMenu(null)
        }
        if (type === 'take') {
            setIMenu(<SellWindow item={item} player={player} setPlayer={setPlayer} pos={pos} setIMenu={setIMenu} dWindow={dWindow} />)
        }
        if (type === 'store') {
            setIMenu(<SellWindow item={item} player={player} setPlayer={setPlayer} pos={pos} setIMenu={setIMenu} dWindow={dWindow} />)
        }
        if (type === 'takeAll') {
            setPlayer(Take(item, player, item.amount))
            setIMenu(null)
        }
        if (type === 'storeAll') {
            setPlayer(Store(item, player, item.amount))
            setIMenu(null)
        }
        if (type === 'buy') {
            setIMenu(<SellWindow item={item} player={player} setPlayer={setPlayer} pos={pos} setIMenu={setIMenu} dWindow={dWindow} />)
        }
        if (type === 'sell') {
            setIMenu(<SellWindow item={item} player={player} setPlayer={setPlayer} pos={pos} setIMenu={setIMenu} dWindow={dWindow} />)
        }
        if (type === 'consumable') {
            setPlayer(Use(item, player))
            setIMenu(null)
        }
        if (type === 'I') {
            setPlayer(Equip(item, player))
            setIMenu(null)
        }
        if (type === 'E') {
            setPlayer(Unequip(item, player))
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
                item.inv === 'PS' ?
                    <>
                        {item.amount === undefined ?
                            <span onClick={() => handleAction('takeAll')}>Take</span> :
                            <>
                                <span onClick={() => handleAction('take')}>Take</span>
                                <span onClick={() => handleAction('takeAll')}>Take All</span>
                            </>
                        }
                    </> :
                    <>
                        {action}
                        {dWindow === 'Shop' ? <span onClick={() => handleAction('sell')}>Sell</span> : null}
                        {dWindow === 'Stash' ?
                            item.amount === undefined ?
                                <span onClick={() => handleAction('storeAll')}>Store</span> :
                                <>
                                    <span onClick={() => handleAction('store')}>Store</span>
                                    <span onClick={() => handleAction('storeAll')}>Store All</span>
                                </> :
                            null}
                        <span onClick={() => handleAction('delete')}>Delete</span>
                    </>
            }




            <span onClick={() => setIMenu(null)}>Close</span>
        </div>
    )
}
export default ItemMenu