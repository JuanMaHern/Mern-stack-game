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
                    {item.slot !== undefined ? <span>Slot: {item.slot}</span> : null}
                    {item.class !== undefined ? <span>Class: {item.class}</span> : null}
                    {item.damage !== undefined ? <span>Damage: {item.damage}</span> : null}
                    {item.defense !== undefined ? <span>Defense: {item.defense}</span> : null}
                    {item.action !== undefined ? <span>{item.action.type}: {item.action.amount} </span> : null}
                    <span>Price: {item.price}G</span>
                </div>
                <span id="closeBtn" onClick={() => setBlurWindow(null)}>Close</span>
            </div>
        </div>
    )
}
export default InfoWindow