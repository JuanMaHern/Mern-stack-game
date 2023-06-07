export function EquipAtribCalc(player) {
    let stats = {
        maxPv: 50 + 5 * ((player.character.lvl * (player.character.lvl - 1)) / 2),
        invCap: 20,
        dmg: Math.floor(player.character.atributes.str / 5),
        def: 0
    }
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const weapon = player.character.equipment.find(elem => elem.type === 'Weapon')
    if (weapon !== undefined) {
        weapon.class === 'Warrior' ?
            stats.dmg = weapon.damage + Math.floor(player.character.atributes.str / 5) :
            weapon.class === 'Archer' ?
                stats.dmg = weapon.damage + Math.floor(player.character.atributes.agi / 5) :
                stats.dmg = weapon.damage + Math.floor(auxPlayer.character.atributes.int / 5)
    }
    for (let i = 0; i < player.character.equipment.length; i++) {
        const auxItem = player.character.equipment[i]
        if (auxItem !== '?' && auxItem.defense !== undefined) {
            stats.def += auxItem.defense
        }
    }
    auxPlayer.character.dmg = stats.dmg === 0? 1 : stats.dmg
    auxPlayer.character.invCap = stats.invCap + Math.floor(auxPlayer.character.atributes.str / 5)
    auxPlayer.character.maxPv = stats.maxPv + Math.floor(auxPlayer.character.atributes.const * 5)
    auxPlayer.character.def = stats.def + Math.floor(player.character.atributes.const / 5)
    return auxPlayer
}