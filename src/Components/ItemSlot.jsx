const ItemSlot = ({ item, handleIMenu }) => {
    let itm = null
    if (item.name !== '?'){
        itm = <img style={{cursor: 'pointer'}} src={item.img} alt={item.name} onClick={() => handleIMenu(item)} />
    }
    return (
        <div className="itemSlot" >
            {itm}
        </div>
    )
} 
export default ItemSlot