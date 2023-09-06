import ProgressBar from "./ProgressBar"

const PlayerInfo = ({player}) => {
    return(
        <div className="playerInfo">
            <span className="avatar" ><img  src={player.character.avatar} alt={player.character.name} /></span>
            <span>{player.character.name}</span>
            <ProgressBar Max={player.character.maxPv} Value={player.character.pv} Color={'red'} Source={'Pv'}/>
            <ProgressBar Max={player.character.maxMp} Value={player.character.mp} Color={'blue'} Source={'Mp'}/>
            {/* <span>Pv: {player.character.pv} / {player.character.maxPv}</span> */}
            {/* <span>Mp: {player.character.mp} / {player.character.maxMp}</span> */}
            <ProgressBar Max={100*player.character.lvl*player.character.lvl} Value={player.character.exp} Color={'orange'} Source={'Lvl'}/>
            {/* <span>Level: {player.character.lvl}</span>
            <span>Exp: {player.character.exp}/{100*player.character.lvl*player.character.lvl}</span> */}
            {/* <span>Damage: {player.character.dmg}</span>
            <span>Defense: {player.character.def}</span>
            <span>Gold: {player.character.gold}</span> */}
        </div>
    )
}
export default PlayerInfo