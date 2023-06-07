export function PlayerExp (player, exp) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const maxExp = 100*player.character.lvl*player.character.lvl
    auxPlayer.character.exp += exp
    if (auxPlayer.character.exp >= maxExp){
        auxPlayer.character.lvl += 1
    }
    return auxPlayer
}