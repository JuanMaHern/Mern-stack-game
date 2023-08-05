const NavBar = ({ setDWindow }) => {
    return(
        <div className="navBar">
            <span onClick={() => setDWindow('Main')} >Main</span>
            <span onClick={() => setDWindow('Player')} >Player</span>
            <span onClick={() => setDWindow('Exploration')} >Exploration</span>
            {/* <span onClick={() => setDWindow('Arena')} >Arena</span> */}
            <span onClick={() => setDWindow('Shop')} >Shop</span>
        </div>
    )
}
export default NavBar