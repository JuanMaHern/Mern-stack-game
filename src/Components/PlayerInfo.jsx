import ProgressBar from "./ProgressBar"

const PlayerInfo = ({player}) => {
    return(
        <div className="playerInfo">
            <span className="avatar" ><img  src={player.character.avatar} alt={player.character.name} /></span>
            <span>{player.character.name}</span>
            <ProgressBar Max={player.character.maxPv} Value={player.character.pv} Color={'red'} Source={'Pv'}/>
            <ProgressBar Max={player.character.maxMp} Value={player.character.mp} Color={'blue'} Source={'Mp'}/>
            <ProgressBar Max={100*player.character.lvl*player.character.lvl} Value={player.character.exp} Color={'orange'} Source={'Lvl'}/>
            <span>Gold: {player.character.gold}</span>
        </div>
    )
}
export default PlayerInfo