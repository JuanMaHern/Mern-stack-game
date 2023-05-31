const InfoWindow = ({ item, setPlayer, setInfoWindow }) => {
    console.log(item)
    return (
        <div className="blur">
            <div className="infoWindow">
                <div className="infoHeader">
                    <div className="itemSlot" ><img src={item.img} alt={item.name} /></div>
                    <div className="headerText">
                        <span id="name" >{item.rarity} {item.name}</span>
                        <span id="desc" >{item.desc}</span>
                    </div>
                </div>
                <div className="infoBody">
                    <span>Type: {item.type}</span>
                    <span>Slot: {item.slot}</span>
                    <span>Class: {item.class}</span>
                    <span>Damage: {item.damage}</span>
                    <span>Price: {item.price}G</span>
                </div>
                <span id="closeBtn" onClick={() => setInfoWindow(null)}>Close</span>
            </div>
        </div>
    )
}
export default InfoWindow