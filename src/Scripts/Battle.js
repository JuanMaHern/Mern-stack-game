import { PlayerExp } from "../Scripts/PlayerControl";
import { Loot } from "../Scripts/LootControl";
import { QuestFetch } from "./QuestSystem";

export function Atack(player, battle, savePlayer) {
    let auxBattle = JSON.parse(JSON.stringify(battle))
    let auxWeapon = auxBattle.player.character.equipment.find(elem => elem.type === "Weapon")
    let dmg = auxBattle.player.character.dmg
    if(auxWeapon.class === 'Archer'){
        let hasQuiver = auxBattle.player.character.equipment.find(elem => elem.id === 23)
        if (hasQuiver !== undefined && hasQuiver.inventori[0] !== undefined){
            let qIndex = auxBattle.player.character.equipment.indexOf(hasQuiver)
            hasQuiver.inventori[0].amount -= 1
            if(hasQuiver.inventori[0].amount < 1){
                hasQuiver.inventori = []
            }
            auxBattle.player.character.equipment[qIndex]=hasQuiver
        } 
    } else if (auxWeapon.class === "Mage"){
        if(auxBattle.player.character.mp < 1){
            dmg = 1
        } else {
            auxBattle.player.character.mp -= 1
        }
    }
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
        auxBattle.player = QuestFetch(auxBattle.player, {type: 'Kill', id: auxBattle.enemy.id, amount: 1})
        if (auxBattle.player.character.lvl > player.character.lvl) {
            auxBattle.log.push('Lvl up')
        }
        auxBattle.loot = Loot(auxBattle.enemy.loot)
        savePlayer(auxBattle.player)
    } else {
        auxBattle.turn = 'enemy'
        auxBattle.log.push('Enemy turn')
    }
    return auxBattle
    /* setBattle(auxBattle) */
}