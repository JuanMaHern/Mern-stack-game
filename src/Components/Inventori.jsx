import { FillInventori } from "../Scripts/FillInventori"
import ItemSlot from "./ItemSlot"

const Inventori = ({ inventori, invCap, handleIMenu }) => {
    const InvFilled = FillInventori(inventori, invCap)
    return (
        <div className="inventori">
            {InvFilled.map(item => {
                return( <ItemSlot key={item.objectId} item={item} handleIMenu={handleIMenu} /> )
            })}
        </div>
    )
}
export default Inventori