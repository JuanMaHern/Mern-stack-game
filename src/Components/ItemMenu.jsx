const ItemMenu = ({ item, pos, setPlayer, setIMenu, handleInfoWindow }) => {
    return (
        <div className="itemMenu" style={{top: pos.y, left: pos.x-70}}>
            <span>{item.inv === 'I'? 'Equip': 'Unequip'}</span>
            <span onClick={() => handleInfoWindow(item)}>Info</span>
            <span>Sell</span>
            <span>Delete</span>
            <span onClick={() => setIMenu(null)}>Close</span>
        </div>
    )
}
export default ItemMenu