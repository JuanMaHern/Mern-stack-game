import itemDb from "../JSON/Items.json"
import ItemSlot from "./ItemSlot"

const LootShow = ({ array }) => {
    let arrayDb = []
    for (let elem of array){
        let auxElem = itemDb.find(item => item.id === elem.id)
        arrayDb.push({name: auxElem.name, img: auxElem.img, rarity: 'Common'})
    }
    return (
        <div className="lootShow">
            {arrayDb.map(elem => {
                return <ItemSlot item={elem} />
            })}
        </div>
    )
}
export default LootShow