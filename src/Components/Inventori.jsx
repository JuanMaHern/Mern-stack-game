import { FillInventori } from "../Scripts/FillInventori"
import ItemSlot from "./ItemSlot"

const Inventori = ({ inventori, invCap }) => {
    const InvFilled = FillInventori(inventori, invCap)
    return (
        <div className="inventori">
            {InvFilled.map(item => {
                return( <ItemSlot key={item.objectId} item={item} /> )
            })}
        </div>
    )
}
export default Inventori