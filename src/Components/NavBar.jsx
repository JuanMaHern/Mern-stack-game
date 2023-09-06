import Clock from "./Clock"
import WorldConfig from "../JSON/WorldConfig.json"

const NavBar = ({ setDWindow, now }) => {
    return (
        <div className="navBar">
            <Clock time={now} />
            <div className="navBar-buttons">
                <span onClick={() => setDWindow('Main')} >Main</span>
                <span onClick={() => setDWindow('Player')} >Player</span>
                <span onClick={() => setDWindow('Exploration')} >Exploration</span>
                <span onClick={() => setDWindow('Shop')} >Shop</span>
                <span onClick={() => setDWindow('Stash')} >Stash</span>
                <span onClick={() => setDWindow('Home')} >Home</span>
            </div>
        </div>
    )
}
export default NavBar