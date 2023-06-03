const ItemSlot = ({ item, handleIMenu }) => {
    let itm = null
    if (item !== '?') {
        itm = <><img className="itemImg" style={{ cursor: 'pointer' }} src={item.img} alt={item.name} onClick={() => handleIMenu(item)} />
            <span style={{ position: 'absolute', bottom: 0, right: 0 }}>{item.amount !== undefined ? item.amount : null}</span>
        </>
    }
    return (
        <div className="itemSlot" id={item.rarity}>
            {itm}
        </div>
    )
}
export default ItemSlot