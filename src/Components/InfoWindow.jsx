import ItemSlot from "./ItemSlot"

const InfoWindow = ({ item, setPlayer, setBlurWindow }) => {
    return (
        <div className="blur">
            <div className="infoWindow">
                <div className="infoHeader">
                    <ItemSlot item={item} />
                    <div className="headerText">
                        <span id="name" >{item.rarity} {item.name}</span>
                        <span id="desc" >{item.desc}</span>
                    </div>
                </div>
                <div className="infoBody">
                    <span>Type: {item.type}</span>
                    <span>{item.type !== 'Consumable' ? `Slot: ${item.slot}` : null}</span>
                    <span>{item.type !== 'Consumable' ? `Class: ${item.class}`: null}</span>
                    {item.damage !== undefined ?
                        <span>Damage: {item.damage}</span> :
                        item.defense !== undefined ?
                            <span>Defense: {item.defense}</span> :
                            <span>{item.action.type}: {item.action.amount} </span>
                    }
                    <span>Price: {item.price}G</span>
                </div>
                <span id="closeBtn" onClick={() => setBlurWindow(null)}>Close</span>
            </div>
        </div>
    )
}
export default InfoWindow