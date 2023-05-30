import Entities from "../JSON/Entities.json"
import ItemDb from "../JSON/Items.json"
import Player from "../JSON/Player.json"
import { useRef } from 'react'
import MainWindow from "./MainWindow"

const App =() => {
    const enemi = useRef(Entities[0])
    const itemDb = useRef(ItemDb)
    const user = useRef(Player[0])
    return(
        <div>
            <MainWindow />
        </div>
    )
}
export default App