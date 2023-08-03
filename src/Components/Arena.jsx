import { useState } from "react"
import { EnemyGen } from "../Scripts/Enemy"
import EntitieCard from "./EntitieCard"
import Battle from "./Battle"

const Arena = ({ player, setPlayer, setBlurWindow }) => {
    const [enemy, setEnemy] = useState([])
    const handleFight = (oponent) => {
        setBlurWindow(<Battle enemy={oponent} player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} />)
        setEnemy()
    }
    const handleGenerate = () => {
        /* let auxEnemy = []
        for (let i = 1; i <= 5; i++){
            auxEnemy.push(EnemyGen(player, 'Arena'))
        }
        setEnemy(auxEnemy) */
        setEnemy(<EntitieCard enemy={EnemyGen(player, 'Arena')} handleFight={handleFight} indx={0} indxPos={0} />)
        
    }
    return (
        <div className="arena">
            <button onClick={() => handleGenerate()} >Generate</button>
            {/* {enemy.map(Entitie => {
                return <EntitieCard enemy={Entitie} handleFight={handleFight} />
            })} */}
            {enemy}
        </div>
    )
} 
export default Arena