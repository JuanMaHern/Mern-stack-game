import { FillInventori } from "../Scripts/InventoriControl"
import ItemSlot from "./ItemSlot"
import { v4 as uuid } from 'uuid'

const Inventori = ({ inventori, invCap, handleIMenu, source, now }) => {
    const InvFilled = FillInventori(inventori, invCap, source)
    return (
        <div className="inventori">
            {InvFilled.map(item => {
                return( <ItemSlot key={item !== '?'? item.objectId === undefined? item.id: item.objectId : uuid() } item={item} handleIMenu={handleIMenu} now={now} /> )
            })}
        </div>
    )
}
export default Inventori