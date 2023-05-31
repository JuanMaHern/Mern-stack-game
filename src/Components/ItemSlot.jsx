const ItemSlot = ({ item }) => {
    let itm = null
    if (item.name !== '?'){
        itm = <img src={item.img} alt={item.name} />
    }
    return (
        <div className="itemSlot" >
            {itm}
        </div>
    )
} 
export default ItemSlot