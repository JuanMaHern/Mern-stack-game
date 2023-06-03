import { useState } from "react"
import ProgressBar from "./ProgressBar"

const Battle = ({ enemy, player, setPlayer, setBlurWindow }) => {
    const [battle, setBattle] = useState({
        player: JSON.parse(JSON.stringify(player)),
        enemy: JSON.parse(JSON.stringify(enemy)),
        turn: 'player',
        status: 'fight',
        loot: []
    })
    if (battle.turn === 'enemy') {
        setTimeout(() => {
            let auxBattle = JSON.parse(JSON.stringify(battle))
            auxBattle.player.character.pv -= auxBattle.enemy.dmg
            auxBattle.player.character.pv < 0 ? auxBattle.player.character.pv = 0 : null
            auxBattle.player.character.pv === 0 ? auxBattle.status = 'lose' : auxBattle.turn = 'player'
            setBattle(auxBattle)
        }, "2000");
    }
    const handleAtack = () => {
        if (battle.turn === 'player') {
            let auxBattle = JSON.parse(JSON.stringify(battle))
            auxBattle.enemy.pv -= auxBattle.player.character.dmg
            auxBattle.enemy.pv < 0 ? auxBattle.enemy.pv = 0 : null
            auxBattle.enemy.pv === 0 ? auxBattle.status = 'win' : auxBattle.turn = 'enemy'
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
                <span style={battle.turn === 'enemy' ? { color: 'grey' } : null} onClick={() => handleAtack()} >Atack</span>
                <span onClick={() => setBlurWindow(null)}>Close</span>
            </div>
        </div>
    )
}
export default Battle