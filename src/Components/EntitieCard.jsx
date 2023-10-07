import LootShow from "./LootShow"

const EntitieCard = ({ enemy, handleFight, indx, indxPos, tool }) => {
    return (
        <div className="entitieCard">
            <span id="info">
                <div className="avatar" ><img src={enemy.img} alt={enemy.name} /></div>
                <p>{enemy.name}</p>
            </span>
            {enemy.type === 'Enemy' ?
                <><span id="info">
                    <p>Pv: {enemy.pv}</p>
                    <p>Lvl:{enemy.lvl}</p>
                </span>
                    <span id="info">
                        <p>Damage: {enemy.dmg} </p>
                        <p>Defense: {enemy.def} </p>
                    </span>
                </> : null}
                <span>
                    <LootShow array={enemy.loot} />
                </span>
            {indxPos === indx ?
                <span className="entitieCardB" onClick={() => handleFight(enemy)}>{enemy.type === 'Enemy' ? 'Fight' : 'Collect'}</span>
                : <span className="entitieCardB block" >{enemy.type === 'Enemy' ? 'Fight' : tool !== undefined ? 'Collect' : 'No tool'}</span>}
        </div>
    )
}
export default EntitieCard