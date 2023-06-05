import { useState } from "react"
import ItemSlot from "./ItemSlot"
import { Sell, Unequip } from "../Scripts/ItemActions"

const SellWindow = ({ item, player, setPlayer, pos, setIMenu }) => {
    const [amount, setAmount] = useState(1)
    const dispAmount = item.amount > 1 ? null : { display: 'none' }
    const handleOnChange = () => {
        setAmount(event.target.value)
    }
    const handleConfirm = () => {
        setPlayer(Sell(item, player, amount))
        setIMenu(null)
    }
    return (
        <div className="sellWindow" style={{ top: pos.y, left: pos.x - 100 }} >
            <ItemSlot item={item} />
            <form style={dispAmount}>
                <label htmlFor="iamount" >{amount}</label>
                <input id="iamount" name="range1" type="range" min="1" max={item.amount} value={amount} onChange={() => handleOnChange()} />
            </form>
            <span>{item.price * amount}G</span>
            <span>
                <span onClick={() => handleConfirm()} >Sell</span>
                <span onClick={() => setIMenu()}>Cancel</span>
            </span>
        </div>
    )
}
export default SellWindow