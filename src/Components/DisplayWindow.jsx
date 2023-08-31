import Arena from "./Arena"
import Exploration from "./Exploration"
import WorkStation from "./WorkStation"
import PlayerStatus from "./PlayerStatus"
import Shop from "./Shop"
import Stash from "./Stash"
import Home from "./Home"

const DisplayWindow = ({ player, setPlayer, dWindow, setBlurWindow, setDWindow, now }) => {

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
            display = <Shop player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} dWindow={dWindow} />
            break
        case 'Stash':
            display = <Stash player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} dWindow={dWindow} />
            break
        case 'Home':
            display = <Home player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} now={now} />
            break
        case 'WorkStation':
            display = <WorkStation player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} dWindow={dWindow} />
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