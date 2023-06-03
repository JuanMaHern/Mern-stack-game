const ItemSlot = ({ item, handleIMenu }) => {
    let itm = null
    if (item !== '?'){
        itm = <img className="itemImg" style={{cursor: 'pointer'}} src={item.img} alt={item.name} onClick={() => handleIMenu(item)} />
    }
    return (
        <div className="itemSlot" id={item.rarity}>
            {itm}
        </div>
    )
} 
export default ItemSlot