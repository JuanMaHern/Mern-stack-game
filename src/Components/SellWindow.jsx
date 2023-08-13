import { useState } from "react"
import ItemSlot from "./ItemSlot"
import { Buy, Sell, Unequip } from "../Scripts/ItemControl"

const SellWindow = ({ item, player, setPlayer, pos, setIMenu }) => {
    const [amount, setAmount] = useState(1)
    const maxAmount = item.inv === 'S' ? Math.floor(player.character.gold/item.price) : item.amount
    const dispAmount = item.amount > 1  || (item.inv === 'S' && maxAmount > 1)? null :{ display: 'none' }
    console.log(maxAmount)
    const handleOnChange = () => {
        setAmount(event.target.value)
    }
    const handleConfirm = () => {
        item.inv === 'S' ? setPlayer(Buy(item, player, Number(amount))) : setPlayer(Sell(item, player, amount))
        setIMenu(null)
    }
    return (
        <div className="sellWindow" style={{ top: pos.y, left: pos.x - 100 }} >
            <ItemSlot item={item} />
            <form style={dispAmount}>
                <label htmlFor="iamount" >{amount}</label>
                <input id="iamount" name="range1" type="range" min={1} max={maxAmount} value={amount} onChange={() => handleOnChange()} />
            </form>
            <span>{item.price * amount}G</span>
            {maxAmount <1? 'Insf. Gold': null}
            <span>
                {maxAmount < 1 ? null :<span onClick={() => handleConfirm()} >{item.inv === 'S'? 'Buy':'Sell'}</span>}
                <span onClick={() => setIMenu()}>Cancel</span>
            </span>
        </div>
    )
}
export default SellWindow