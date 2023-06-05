const EquipControl = (item, player) => {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const equipItem = player.character.equipment.find(object => object.slot === item.slot)

    if (item.slot === 'Doble-handed') {
        const right = player.character.equipment.find(object => object.slot === 'Right-hand')
        const left = player.character.equipment.find(object => object.slot === 'Left-hand')
        right !== undefined ? auxPlayer = Unequip(right, auxPlayer) : null
        return left !== undefined ? Unequip(left, auxPlayer) : auxPlayer
    }
    if (item.slot === 'Right-hand' || item.slot === 'Left-hand') {
        const DHand = player.character.equipment.find(object => object.slot === 'Doble-handed')
        if (DHand !== undefined) {
            return Unequip(DHand, player)
        }
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
    auxPlayer.character.equipment.push({ ...player.character.inventori[invItem], inv: 'E' })
    auxPlayer.character.inventori.splice(invItem, 1)
    console.log(auxPlayer)
    return auxPlayer
}

export function Unequip(item, player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const equipItem = player.character.equipment.indexOf(player.character.equipment.find(object => object.objectId === item.objectId))
    auxPlayer.character.inventori.push({ ...player.character.equipment[equipItem], inv: 'I' })
    auxPlayer.character.equipment.splice(equipItem, 1)
    return auxPlayer
}

export function Use(item, player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    if (item.type === 'Consumable') {
        if (item.action.type === 'Heal') {
            if (auxPlayer.character.pv < auxPlayer.character.maxPv) {
                let pv = auxPlayer.character.pv + item.action.amount
                if (pv > auxPlayer.character.maxPv) {
                    pv = auxPlayer.character.maxPv
                }
                let index = player.character.inventori.indexOf(player.character.inventori.find(elem => elem.objectId === item.objectId))
                item.amount > 1 ? auxPlayer.character.inventori[index].amount -= 1 : auxPlayer.character.inventori.splice(index, 1)
                auxPlayer.character.pv = pv
            }
            return auxPlayer
        }

    }
}

export function Sell(item, player, amount) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    auxPlayer.character.gold += item.price * amount
    if (item.amount !== undefined && item.amount > amount) {
        let auxItem = auxPlayer.character.inventori.find(elem => elem.objectId === item.objectId)
        let index = auxPlayer.character.inventori.indexOf(auxItem)
        auxPlayer.character.inventori[index].amount -= amount
    } else {
        auxPlayer = DeleteItem(item, auxPlayer)
    }
    return auxPlayer
}

export function DeleteItem(item, player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    if (item.inv === 'E') {
        auxPlayer = Unequip(item, auxPlayer)
    }
    let index = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(elem => elem.objectId === item.objectId))
    auxPlayer.character.inventori.splice(index, 1)
    return auxPlayer
}