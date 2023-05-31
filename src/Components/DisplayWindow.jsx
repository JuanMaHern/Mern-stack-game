import PlayerStatus from "./PlayerStatus"

const DisplayWindow = ({ player, dWindow }) => {
    let display = null
    switch (dWindow) {
        case 'Player':
            display = <PlayerStatus player={player.character} />
            break
        case 'Arena':
            break
        case 'Shop':
            break
        default:
            break
    }
    return (
        <div className="displayWindow">
            {display}
        </div>
    )
}
export default DisplayWindow