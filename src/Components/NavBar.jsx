import Clock from "./Clock"
import WorldConfig from "../JSON/WorldConfig.json"

const NavBar = ({ setDWindow, now }) => {
    return (
        <div className="navBar">
            <Clock time={now} />
            <div className="navBar-buttons">
                <span className="navBar-button" onClick={() => setDWindow('Town')} >Town</span>
                <span className="navBar-button" onClick={() => setDWindow('Player')} >Player</span>
                <span className="navBar-button" onClick={() => setDWindow('Exploration')} >Exploration</span>
                <span className="navBar-button" onClick={() => setDWindow('Shop')} >Shop</span>
                <span className="navBar-button" onClick={() => setDWindow('Stash')} >Stash</span>
                <span className="navBar-button" onClick={() => setDWindow('Home')} >Home</span>
            </div>
        </div>
    )
}
export default NavBar