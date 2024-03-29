
/* Player atribute loader */
export function EquipAtribCalc(player) {
    let stats = {
        maxPv: 50 + 5 * ((player.character.lvl * (player.character.lvl - 1)) / 2),
        invCap: player.character.invCap,
        dmg: Math.floor(player.character.atributes.str / 5),
        def: 0
    }
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const weapon = player.character.equipment.find(elem => elem.type === 'Weapon')
    if (weapon !== undefined) {
        switch (weapon.class) {
            case 'Warrior':
                stats.dmg = weapon.damage + Math.floor(player.character.atributes.str / 5)
                break
            case 'Archer':
                let hasQuiver = auxPlayer.character.equipment.find(elem => elem.id === 23)
                let hasAmmo = hasQuiver !== undefined ? hasQuiver.inventori[0] : undefined
                console.log(hasQuiver)
                console.log(hasAmmo)
                if (hasQuiver !== undefined && hasAmmo !== undefined) {
                    stats.dmg = weapon.damage + Math.floor(player.character.atributes.agi / 5)
                }
                break
            case 'Mage':
                stats.dmg = weapon.damage + Math.floor(auxPlayer.character.atributes.int / 5)
                break
            default:
                break
        }
    }
    for (let i = 0; i < player.character.equipment.length; i++) {
        const auxItem = player.character.equipment[i]
        if (auxItem !== '?' && auxItem.defense !== undefined) {
            stats.def += auxItem.defense
        }
    }
    auxPlayer.character.dmg = stats.dmg === 0 ? 1 : stats.dmg
    auxPlayer.character.invCap = stats.invCap + Math.floor(auxPlayer.character.atributes.str / 5)
    auxPlayer.character.maxPv = stats.maxPv + Math.floor(auxPlayer.character.atributes.const * 5)
    auxPlayer.character.def = stats.def + Math.floor(player.character.atributes.const / 5)
    return auxPlayer
}

export function PlayerExp(player, exp) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const maxExp = 100 * player.character.lvl * player.character.lvl
    auxPlayer.character.exp += exp
    if (auxPlayer.character.exp >= maxExp) {
        auxPlayer.character.lvl += 1
        auxPlayer.character.exp -= maxExp
        auxPlayer.character.atribPoints += 5
        auxPlayer = EquipAtribCalc(auxPlayer)
        auxPlayer.character.pv = auxPlayer.character.maxPv
        auxPlayer.character.def = player.character.def
    }
    return auxPlayer
}
export function SkillExp(player, profession, xp) {
    console.log(profession)
    console.log(xp)
    let auxPlayer = JSON.parse(JSON.stringify(player))
    let skill = auxPlayer.character.skills[profession]
    skill.Xp += xp
    while (skill.Xp >= 100 * skill.Level * skill.Level) {
        skill.Level += 1
    }
    auxPlayer.character.skills[profession] = skill
    return auxPlayer
}