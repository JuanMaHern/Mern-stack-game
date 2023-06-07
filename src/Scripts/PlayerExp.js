import { EquipAtribCalc } from "./EquipAtribCalc"

export function PlayerExp (player, exp) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const maxExp = 100*player.character.lvl*player.character.lvl
    auxPlayer.character.exp += exp
    if (auxPlayer.character.exp >= maxExp){
        auxPlayer.character.lvl += 1
        auxPlayer.character.atribPoints += 5
        auxPlayer = EquipAtribCalc(auxPlayer)
        auxPlayer.character.pv = auxPlayer.character.maxPv
        auxPlayer.character.def = player.character.def
    }
    return auxPlayer
}