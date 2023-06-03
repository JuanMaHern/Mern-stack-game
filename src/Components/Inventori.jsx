import { FillInventori } from "../Scripts/FillInventori"
import ItemSlot from "./ItemSlot"
import { v4 as uuid } from 'uuid'

const Inventori = ({ inventori, invCap, handleIMenu }) => {
    const InvFilled = FillInventori(inventori, invCap)
    return (
        <div className="inventori">
            {InvFilled.map(item => {
                return( <ItemSlot key={item !== '?'? item.objectId : uuid() } item={item} handleIMenu={handleIMenu} /> )
            })}
        </div>
    )
}
export default Inventori