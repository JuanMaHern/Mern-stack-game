import { useState } from "react"
import ItemSlot from "./ItemSlot"
import { Buy, Sell, Store, Take, Unequip } from "../Scripts/ItemControl"

const SellWindow = ({ item, player, setPlayer, pos, setIMenu, dWindow }) => {
    const [amount, setAmount] = useState(1)
    const maxAmount = item.inv === 'S' ? Math.floor(player.character.gold / item.price) : item.amount
    const dispAmount = item.amount > 1 || (item.inv === 'S' && maxAmount > 1) ? null : { display: 'none' }
    console.log(maxAmount)
    const handleOnChange = () => {
        setAmount(event.target.value)
    }
    const handleConfirm = () => {
        if (dWindow === 'Shop') {
            item.inv === 'S' ? setPlayer(Buy(item, player, Number(amount))) : setPlayer(Sell(item, player, amount))
        } else {
            /* item.inv === 'PS' ? setPlayer(Take(item, player, Number(amount))) : setPlayer(Store(item, player, amount)) */
        }
        setIMenu(null)
    }
    return (
        <div className="sellWindow" style={{ top: pos.y, left: pos.x - 100 }} >
            <ItemSlot item={item} />
            <form style={dispAmount}>
                <label htmlFor="iamount" >{amount}</label>
                <input id="iamount" name="range1" type="range" min={1} max={maxAmount} value={amount} onChange={() => handleOnChange()} />
            </form>
            {dWindow === 'Shop'? <span>{item.price * amount}G</span>:null}
            {maxAmount < 1 ? 'Insf. Gold' : null}
            <span>
                {maxAmount < 1 ? null :
                    dWindow === 'Shop' ?
                        <span onClick={() => handleConfirm()} >{item.inv === 'S' ? 'Buy' : 'Sell'}</span> :
                <span onClick={() => handleConfirm()} >{item.inv === 'PS' ? 'Take' : 'Store'}</span>}
                <span onClick={() => setIMenu()}>Cancel</span>
            </span>
        </div>
    )
}
export default SellWindow