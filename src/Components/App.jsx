import Player from "../JSON/Player.json"
import { useRef } from 'react'
import MainWindow from "./MainWindow"

const App =() => {
    const user = useRef(Player[0])
    return(
        <div>
            <MainWindow user={user} />
        </div>
    )
}
export default App