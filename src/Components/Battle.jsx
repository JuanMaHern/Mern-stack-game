import { useState } from "react"
import ProgressBar from "./ProgressBar"
import ItemSlot from "./ItemSlot";
import { v4 as uuid } from 'uuid'
import { Loot } from "../Scripts/Loot";

const Battle = ({ enemy, player, setPlayer, setBlurWindow }) => {
    const [battle, setBattle] = useState({
        player: JSON.parse(JSON.stringify(player)),
        enemy: JSON.parse(JSON.stringify(enemy)),
        turn: 'player',
        status: 'fight',
        loot: ['?','?','?','?','?','?','?','?'],
        log: []
    })
    if (battle.turn === 'enemy') {
        setTimeout(() => {
            let auxBattle = JSON.parse(JSON.stringify(battle))
            let dmg = auxBattle.enemy.dmg
            auxBattle.player.character.pv < dmg ? dmg= auxBattle.player.character.pv : null
            auxBattle.player.character.pv -= dmg
            auxBattle.log.push(`Enemy deals ${dmg} dmg`)
            if (auxBattle.player.character.pv === 0){
                auxBattle.status = 'lose'
                auxBattle.log.push(`${player.character.name} loses`)
            } else {
                auxBattle.turn = 'player'
                auxBattle.log.push(`${player.character.name} turn`)
            }
            setBattle(auxBattle)
        }, "2000");
    }
    const handleAtack = () => {
        if (battle.turn === 'player' && battle.status === 'fight') {
            let auxBattle = JSON.parse(JSON.stringify(battle))
            let dmg = auxBattle.player.character.dmg
            auxBattle.enemy.pv < dmg? dmg = auxBattle.enemy.pv : null  
            auxBattle.enemy.pv -= dmg
            auxBattle.log.push(`${player.character.name} deals ${dmg} dmg`)
            if (auxBattle.enemy.pv === 0){
                auxBattle.status = 'win'
                auxBattle.log.push(`${player.character.name} wins`)
                auxBattle.loot = Loot(enemy) 
                console.log(auxBattle.loot)
            } else {
                auxBattle.turn = 'enemy'
                auxBattle.log.push('Enemy turn')
            }
            setBattle(auxBattle)
        }
    }
    return (
        <div className="blur">
            <div className="battle">
                <span className="avatar"><img src={enemy.img} alt={enemy.name} /></span>
                <span>{battle.enemy.pv}/{enemy.pv}</span>
                <ProgressBar Max={enemy.pv} Value={battle.enemy.pv} />
                <span className="avatar"><img src={player.character.avatar} alt={player.character.name} /></span>
                <span>{battle.player.character.pv}/{player.character.maxPv}</span>
                <ProgressBar Max={player.character.maxPv} Value={battle.player.character.pv} />
                <span style={battle.status === 'fight'? battle.turn === 'enemy' ? { color: 'grey' } : null : { color: 'grey' }  } onClick={() => handleAtack()} >Atack</span>
                <span onClick={() => setBlurWindow(null)}>Close</span>
            </div>
            <span className="battleLateral">
                <div className="battleLog">{battle.log.map(entry => {
                    return <span key={`entry${battle.log.indexOf(entry)}`} >{entry}</span>
                })}</div>
                <span>Loot</span>
                <div className="battleLoot">{battle.loot.map(item => {
                    return <ItemSlot key={item !== '?'? item.objectId : uuid() } item={item} />
                })}</div>
            </span>
        </div>
    )
}
export default Battle