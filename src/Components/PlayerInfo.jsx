const PlayerInfo = ({player}) => {
    return(
        <div className="playerInfo">
            <span className="avatar" ><img  src={player.character.avatar} alt={player.character.name} /></span>
            <span>{player.character.name}</span>
            <span>Pv: {player.character.pv} / {player.character.maxPv}</span>
            <span>Level: {player.character.lvl}</span>
            <span>Exp: {player.character.exp}/{100*player.character.lvl*player.character.lvl}</span>
            <span>Damage: {player.character.dmg}</span>
            <span>Defense: {player.character.def}</span>
            <span>Gold: {player.character.gold}</span>
        </div>
    )
}
export default PlayerInfo