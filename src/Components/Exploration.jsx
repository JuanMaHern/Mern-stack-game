import EntitieCard from "./EntitieCard"
import Battle from "./Battle"
import { useState } from "react"
import { ExplorationGen } from "../Scripts/Exploration"
import { AddtoInv, InvProfSearch } from "../Scripts/InventoriControl"
import { ResourceLoot } from "../Scripts/LootControl"

const Exploration = ({ player, setPlayer, setBlurWindow }) => {
    const [engage, setEngage] = useState({ location: 'none', enemies: [], indxPos: 0 })
    if (engage.enemies.length > 1 && engage.indxPos < 10) {
        console.log(engage.enemies[engage.indxPos])
        if (engage.enemies[engage.indxPos].type === 'Resource') {
            if (!InvProfSearch(player.character.inventori, engage.enemies[engage.indxPos].proffesion)) {
                let auxEngage = JSON.parse(JSON.stringify(engage))
                auxEngage.indxPos += 1
                setEngage(auxEngage)
            } else {
                console.log('Tiene herramienta')
            }
        }
    }

    const handleFight = (oponent) => {
        if (oponent.type === "Enemy") {
            setBlurWindow(<Battle enemy={oponent} player={player} setPlayer={setPlayer} setBlurWindow={setBlurWindow} handleWin={handleWin} />)
        } else {
            let auxPlayer = JSON.parse(JSON.stringify(player))
            let auxInv = auxPlayer.character.inventori
            for (let item of ResourceLoot(oponent.loot)) {
                auxInv = AddtoInv(auxInv, item)
            }
            auxPlayer.character.inventori = auxInv
            setPlayer(auxPlayer)
            handleWin()
        }

    }

    const handleWin = () => {
        let auxEngage = JSON.parse(JSON.stringify(engage))
        auxEngage.indxPos += 1
        setEngage(auxEngage)
    }

    const handleLocation = (loc) => {
        setEngage({ location: loc, enemies: ExplorationGen(loc), indxPos: 0 })
    }
    return (
        <div className="exploration">
            <div style={engage.location !== 'none' ? { display: 'none' } : null} className="location">
                <span className="plains" onClick={() => handleLocation('Plains')}>Plains</span>
                <span className="montain" onClick={() => handleLocation('Montain')}>Montain</span>
                <span className="forest" onClick={() => handleLocation('Forest')}>Forest</span>
                <span className="desert" onClick={() => handleLocation('Desert')}>Desert</span>
                <span className="beach" onClick={() => handleLocation('Beach')}>Beach</span>
            </div>
            <div style={engage.location === 'none' ? { display: 'none' } : null} className="exp-Engaged" >
                <span className="exp-Title">
                    <span className="exp-Back" onClick={() => setEngage({ location: 'none', enemies: [] })}>back</span>
                    <p>{engage.location}</p>
                </span>
                {engage.enemies.map(entitie => {
                    const tool = InvProfSearch(player.character.inventori, entitie.proffesion)
                    return <EntitieCard enemy={entitie} handleFight={handleFight} indx={entitie.indx} indxPos={engage.indxPos} tool={tool} />
                })}
            </div>
        </div>
    )
}
export default Exploration