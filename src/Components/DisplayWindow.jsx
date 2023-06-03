import Arena from "./Arena"
import PlayerStatus from "./PlayerStatus"

const DisplayWindow = ({ player, setPlayer, dWindow, setBlurWindow }) => {

    let display = null
    switch (dWindow) {
        case 'Player':
            display = <PlayerStatus player={player.character} />
            break
        case 'Arena':
            display = <Arena player= {player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />
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