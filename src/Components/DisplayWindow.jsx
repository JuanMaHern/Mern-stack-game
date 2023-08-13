import Arena from "./Arena"
import Exploration from "./Exploration"
import PlayerStatus from "./PlayerStatus"
import Shop from "./Shop"

const DisplayWindow = ({ player, setPlayer, dWindow, setBlurWindow }) => {

    let display = null
    switch (dWindow) {
        case 'Player':
            display = <PlayerStatus player={player} setPlayer={setPlayer} />
            break
        case 'Exploration':
            display = <Exploration player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />
            break
        case 'Arena':
            display = <Arena player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />
            break
        case 'Shop':
            display = <Shop player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />
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