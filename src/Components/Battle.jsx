import { useState } from "react"
import ProgressBar from "./ProgressBar"
import ItemSlot from "./ItemSlot";
import { v4 as uuid } from 'uuid'
import { AddtoInv } from "../Scripts/InventoriControl";
import { Atack } from "../Scripts/Battle";

const Battle = ({ enemy, player, setPlayer, setBlurWindow, handleWin }) => {
    const [battle, setBattle] = useState({
        player: JSON.parse(JSON.stringify(player)),
        enemy: JSON.parse(JSON.stringify(enemy)),
        turn: 'player',
        status: 'fight',
        loot: ['?', '?', '?', '?', '?', '?', '?', '?'],
        log: []
    })

    const savePlayer = (battleData) => {
        let auxPlayer = JSON.parse(JSON.stringify(battleData))
        auxPlayer.character.def = player.character.def
        setPlayer(auxPlayer)
    }
    const handleLoot = (item) => {
        let auxBattle = JSON.parse(JSON.stringify(battle))
        const auxLoot = auxBattle.loot.find(elem => elem.objectId === item.objectId)
        auxBattle.loot.splice(auxBattle.loot.indexOf(auxLoot), 1, '?')
        auxBattle.player.character.inventori = AddtoInv(auxBattle.player.character.inventori, auxLoot)
        setBattle(auxBattle)
        savePlayer(auxBattle.player)
    }
    if (battle.turn === 'enemy') {
        setTimeout(() => {
            let auxBattle = JSON.parse(JSON.stringify(battle))
            let dmg = auxBattle.enemy.dmg
            if (auxBattle.player.character.def > 0) {
                let auxDmg = JSON.parse(JSON.stringify(dmg))
                auxBattle.player.character.def <= auxDmg ? dmg -= auxBattle.player.character.def : dmg = 0
                auxBattle.player.character.def -= auxDmg - dmg
                auxBattle.log.push(`${player.character.name} block ${auxDmg - dmg} dmg`)
            }
            auxBattle.player.character.pv < dmg ? dmg = auxBattle.player.character.pv : null
            auxBattle.player.character.pv -= dmg
            auxBattle.log.push(`Enemy deals ${dmg} dmg`)
            if (auxBattle.player.character.pv === 0) {
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
            auxBattle = Atack(player, battle, savePlayer)
            /* let dmg = auxBattle.player.character.dmg
            if (auxBattle.enemy.def > 0) {
                let auxDmg = JSON.parse(JSON.stringify(dmg))
                auxBattle.enemy.def <= auxDmg ? dmg -= auxBattle.enemy.def : dmg = 0
                auxBattle.enemy.def -= auxDmg - dmg
                auxBattle.log.push(`Enemy block ${auxDmg - dmg} dmg`)
            }
            auxBattle.enemy.pv < dmg ? dmg = auxBattle.enemy.pv : null
            auxBattle.enemy.pv -= dmg
            auxBattle.log.push(`${player.character.name} deals ${dmg} dmg`)
            if (auxBattle.enemy.pv === 0) {
                auxBattle.status = 'win'
                auxBattle.player.character.gold += auxBattle.enemy.gold
                auxBattle.log.push(`${player.character.name} wins`)
                auxBattle.log.push(`+${auxBattle.enemy.gold}G`)
                auxBattle.log.push(`+${auxBattle.enemy.exp} xp`)
                auxBattle.player = PlayerExp(auxBattle.player, auxBattle.enemy.exp)
                if (auxBattle.player.character.lvl > player.character.lvl) {
                    auxBattle.log.push('Lvl up')
                }
                auxBattle.loot = Loot(enemy.loot)
                savePlayer(auxBattle.player)
            } else {
                auxBattle.turn = 'enemy'
                auxBattle.log.push('Enemy turn')
            } */
            setBattle(auxBattle)
        }
    }
    const handleClose = () => {
        savePlayer(battle.player)
        if (battle.status === 'win'){
            handleWin()
        }
        setBlurWindow(null)
    }

    return (
        <div className="blur">
            <div className="battle">
                <span className="avatar"><img src={enemy.img} alt={enemy.name} /></span>
                <ProgressBar Max={enemy.pv} Value={battle.enemy.pv} Color={'red'} Source={'Pv'}/>
                <span className="avatar"><img src={player.character.avatar} alt={player.character.name} /></span>
                <ProgressBar Max={player.character.def} Value={battle.player.character.def} Color={'green'} Source={'Def'}/>
                <ProgressBar Max={battle.player.character.maxPv} Value={battle.player.character.pv} Color={'red'} Source={'Pv'}/>
                <ProgressBar Max={battle.player.character.maxMp} Value={battle.player.character.mp} Color={'blue'} Source={'Mp'}/>
                <span style={battle.status === 'fight' ? battle.turn === 'enemy' ? { color: 'grey' } : null : { color: 'grey' }} onClick={() => handleAtack()} >Atack</span>
                <span onClick={() => handleClose()}>Close</span>
            </div>
            <span className="battleLateral">
                <div className="battleLog">{battle.log.map((entry, index)=> {
                    return <span key={`entry${index}}`} >{entry}</span>
                })}</div>
                <span>Loot</span>
                <div className="battleLoot">{battle.loot.map(item => {
                    return <ItemSlot key={item !== '?' ? item.objectId : uuid()} item={item} handleIMenu={handleLoot} />
                })}</div>
            </span>
        </div>
    )
}
export default Battle