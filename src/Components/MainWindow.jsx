import DisplayWindow from "./DisplayWindow"
import LateralWindow from "./LateralWindow"
import NavBar from "./NavBar"

const MainWindow = () => {
    return(
        <div className="mainWindow">
            <NavBar />
            <DisplayWindow />
            <LateralWindow />
        </div>
    )
}
export default MainWindow