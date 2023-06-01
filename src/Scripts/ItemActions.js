const EquipControl = (item, player) => {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const equipItem = player.character.equipment.find(object => object.slot === item.slot)
    
    if (item.slot === 'Doble-handed') {
        const right = player.character.equipment.find(object => object.slot === 'Right-hand')
        const left = player.character.equipment.find(object => object.slot === 'Left-hand')
        console.log(right)
        console.log(left)
        right !== undefined? auxPlayer = Unequip(right, auxPlayer): null
        return  left !== undefined? Unequip(left, auxPlayer): auxPlayer
    }
    if(item.slot === 'Right-hand' || item.slot === 'Left-hand'){
        const DHand = player.character.equipment.find(object => object.slot === 'Doble-handed')
        return DHand !== undefined? Unequip(DHand, player): auxPlayer
    }
    if (equipItem === undefined) {
        return auxPlayer
    }
    if (item.slot === equipItem.slot) {
        return Unequip(equipItem, player)
    }
}

export function Equip(item, player) {
    let auxPlayer = EquipControl(item, player)
    const invItem = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(object => object.objectId === item.objectId))
    auxPlayer.character.equipment.push(player.character.inventori[invItem])
    auxPlayer.character.inventori.splice(invItem, 1)
    return auxPlayer
}

export function Unequip(item, player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const equipItem = player.character.equipment.indexOf(player.character.equipment.find(object => object.objectId === item.objectId))
    auxPlayer.character.inventori.push(player.character.equipment[equipItem])
    auxPlayer.character.equipment.splice(equipItem, 1)
    return auxPlayer
}