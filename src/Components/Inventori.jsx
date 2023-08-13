import { FillInventori } from "../Scripts/InventoriControl"
import ItemSlot from "./ItemSlot"
import { v4 as uuid } from 'uuid'

const Inventori = ({ inventori, invCap, handleIMenu, source }) => {
    console.log(source)
    const InvFilled = FillInventori(inventori, invCap, source)
    console.log(InvFilled)
    return (
        <div className="inventori">
            {InvFilled.map(item => {
                return( <ItemSlot key={item !== '?'? item.objectId : uuid() } item={item} handleIMenu={handleIMenu} /> )
            })}
        </div>
    )
}
export default Inventori