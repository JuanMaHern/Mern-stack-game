const ItemSlot = ({ item, handleIMenu, now }) => {
    const auxItem = item.inv !== 'C' ? JSON.parse(JSON.stringify(item)) : JSON.parse(JSON.stringify(item.item))
    let itm = null
    const seconds = auxItem.inv === 'C' ? (item.time-now)/1000 : null
    let pointer = handleIMenu === undefined? null: { cursor: 'pointer' }
    const handleItem = () => {
        if(auxItem.inv === 'C'){
            seconds <= 0? handleIMenu(item): null
        } else {
            handleIMenu(auxItem)
        }
    }
    if (auxItem !== '?') {
        itm = <><img className="itemImg" style={pointer} src={auxItem.img} alt={auxItem.name} onClick={() => handleItem()} />
            <span style={{ position: 'absolute', bottom: 0, right: 0 }}>{auxItem.amount !== undefined ? auxItem.amount : null}</span>
        </>
    }
    return (
        <div className="itemSlot" id={auxItem.rarity} title={auxItem.name} >
            {itm}
            {auxItem.inv === 'C' && seconds >= 0 ? <span style={{ position: 'absolute', top: 5, left: 5 }}>{seconds}</span> : null}
        </div>
    )
}
export default ItemSlot