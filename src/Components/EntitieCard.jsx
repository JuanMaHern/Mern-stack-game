const EntitieCard = ({ enemy, handleFight }) => {
    console.log(enemy)
    return (
        <div className="entitieCard">
            <span>
                <div className="avatar" ><img src={enemy.img} alt={enemy.name} /></div>
                <p>{enemy.name}</p>
            </span>
            <span>
                <p>Pv: {enemy.pv}</p>
                <p>Lvl:{enemy.lvl}</p>
            </span>
            <span>
                <p>Damage: {enemy.dmg} </p>
                <p>Defense: {enemy.def} </p>
            </span>
            <button className="entitieCardB" onClick={() => handleFight(enemy)}>Fight</button>
        </div>
    )
}
export default EntitieCard