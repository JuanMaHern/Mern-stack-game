import Entities from "../JSON/Entities.json"
import ItemDb from "../JSON/Items.json"
import Player from "../JSON/Player.json"
import { useRef } from 'react'
import MainWindow from "./MainWindow"

const App =() => {
    const enemi = useRef(Entities)
    const itemDb = useRef(ItemDb)
    const user = useRef(Player[0])
    return(
        <div>
            <MainWindow user={user} enemi={enemi} itemDb={itemDb} />
        </div>
    )
}
export default App