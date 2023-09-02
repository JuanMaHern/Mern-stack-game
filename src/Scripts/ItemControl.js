import { AddtoInv } from "./InventoriControl"
import { EquipAtribCalc, SkillExp } from "./PlayerControl"
import { v4 as uuid } from "uuid"
import itemDb from "../JSON/Items.json"
import { randomRarity } from "./LootControl"
import { Time } from "./Time"

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
    auxPlayer = EquipAtribCalc(auxPlayer)
    return auxPlayer
}

export function Unequip(item, player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const equipItem = player.character.equipment.indexOf(player.character.equipment.find(object => object.objectId === item.objectId))
    auxPlayer.character.inventori.push({ ...player.character.equipment[equipItem], inv: 'I' })
    auxPlayer.character.equipment.splice(equipItem, 1)
    auxPlayer = EquipAtribCalc(auxPlayer)
    return auxPlayer
}

export function ToQuiver(item, player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    let auxItem = auxPlayer.character.inventori.find(elem => elem.objectId === item.objectId)
    let hasQuiver = auxPlayer.character.equipment.find(elem => elem.id === 23)
    console.log(hasQuiver)
    if (hasQuiver !== undefined) {
        const qIndex = auxPlayer.character.equipment.indexOf(hasQuiver)
        const iIndex = auxPlayer.character.inventori.indexOf(auxItem)
        if (hasQuiver.inventori[0] === undefined) {
            hasQuiver.inventori[0] = auxItem
            auxPlayer.character.inventori.splice(iIndex, 1)
        } else {
            if (hasQuiver.inventori[0].id !== auxItem.id) {
                auxPlayer.character.inventori.push(hasQuiver.inventori[0])
                hasQuiver.inventori[0] = auxItem
                auxPlayer.character.inventori.splice(iIndex, 1)
            } else if (hasQuiver.inventori[0].amount < 100) {
                const rest = hasQuiver.inventori[0].amount + auxItem.amount - 100
                if (rest <= 0) {
                    hasQuiver.inventori[0].amunt += auxItem.amount
                    auxPlayer.character.inventori.splice(iIndex, 1)
                } else {
                    auxPlayer.character.inventori[iIndex].amount -= (100 - hasQuiver.inventori[0].amount)
                    hasQuiver.inventori[0].amount = 100
                }
            }
        }
        auxPlayer.character.equipment[qIndex] = hasQuiver
    }

    return EquipAtribCalc(auxPlayer)
}

export function Unpack(item, player) {
    console.log(item)
    let auxPlayer = JSON.parse(JSON.stringify(player))
    if (item.inventori[0] !== undefined) {
        let auxItem = JSON.parse(JSON.stringify(item))
        auxPlayer.character.inventori.push(auxItem.inventori[0])
        auxItem.inventori = []
        if (auxItem.inv === 'I') {
            let iIndex = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(elem => elem.objectId === auxItem.objectId))
            auxPlayer.character.inventori[iIndex] = auxItem
        } else {
            let iIndex = auxPlayer.character.equipment.indexOf(auxPlayer.character.equipment.find(elem => elem.objectId === auxItem.objectId))
            auxPlayer.character.equipment[iIndex] = auxItem
        }
    }
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
export function Buy(item, player, amount) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    auxPlayer.character.gold -= item.price * amount
    let auxItem = item.type === 'Weapon' || item.type === 'Armor' || item.type === 'Tool' ? item : { ...item, amount: amount }
    auxPlayer.character.inventori = AddtoInv(auxPlayer.character.inventori, { ...auxItem, inv: 'I', objectId: uuid() })
    return auxPlayer
}

export function Store(item, player, amount) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    let auxItem = item.type === 'Weapon' || item.type === 'Armor' || item.type === 'Tool' ? item : { ...item, amount: Number(amount) }
    auxPlayer.character.stash = AddtoInv(auxPlayer.character.stash, { ...auxItem, inv: 'PS' })
    if (item.amount === undefined || item.amount === Number(amount)) {
        auxPlayer = DeleteItem(item, auxPlayer)
    } else {
        let index = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(elem => elem.objectId === item.objectId))
        auxPlayer.character.inventori[index].amount -= amount
    }
    return auxPlayer

}
export function Take(item, player, amount) {
    console.log(item)
    let auxPlayer = JSON.parse(JSON.stringify(player))
    let auxItem = item.type === 'Weapon' || item.type === 'Armor' || item.type === 'Tool' || item.type === 'Container' ? item : { ...item, amount: Number(amount) }
    auxPlayer.character.inventori = AddtoInv(auxPlayer.character.inventori, { ...auxItem, inv: 'I' })
    if (item.amount === undefined || item.amount === Number(amount)) {
        auxPlayer = DeleteItem(item, auxPlayer)
    } else {
        let index = auxPlayer.character.stash.indexOf(auxPlayer.character.stash.find(elem => elem.objectId === item.objectId))
        auxPlayer.character.stash[index].amount -= amount
    }
    return auxPlayer
}

export function DeleteItem(item, player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    if (item.inv === 'PS') {
        let index = auxPlayer.character.stash.indexOf(auxPlayer.character.stash.find(elem => elem.objectId === item.objectId))
        auxPlayer.character.stash.splice(index, 1)
    } else {
        if (item.inv === 'E') {
            auxPlayer = Unequip(item, auxPlayer)
        }
        let index = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(elem => elem.objectId === item.objectId))
        auxPlayer.character.inventori.splice(index, 1)
    }
    return auxPlayer
}

export function DbItem(id) {
    return itemDb.find(elem => elem.id === id)
}

export function ItemAmount(array, id) {
    let auxAmount = 0
    for (let elem of array) {
        if (elem.id === id) {
            auxAmount += elem.amount
        }
    }
    return auxAmount
}

export function FindArrayItems(array, id) {
    let auxArray = []
    for (let item of array) {
        if (item.id === id) {
            auxArray.push(item)
        }
    }
    return auxArray
}

export function ItemsIndex(array, id) {
    let auxArray = []
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            let auxAmount = array[i].amount === undefined ? 1 : array[i].amount
            auxArray.push({ index: i, amount: auxAmount })
        }
    }
    return auxArray
}

export function Craft(player, item, recipe, amount) {
    console.log(item)
    let auxPlayer = JSON.parse(JSON.stringify(player))
    for (let mat of recipe.mats) {
        const auxMats = ItemsIndex(auxPlayer.character.inventori, mat.id)
        let auxAmount = mat.amount * amount
        for (let i = auxMats.length - 1; i >= 0; i--) {
            if (auxAmount - auxMats[i].amount >= 0) {
                console.log(auxAmount)
                auxAmount -= auxMats[i].amount
                auxPlayer.character.inventori.splice(auxMats[i].index, 1)
            } else {
                if (auxAmount > 0) {
                    auxPlayer.character.inventori[auxMats[i].index].amount -= auxAmount
                    auxAmount = 0
                }
            }
        }
    }

    if (item.type === 'Weapon' || item.type === 'Armor' || item.type === 'Tool') {
        let auxAmount = JSON.parse(JSON.stringify(amount))
        while (auxAmount > 0) {
            auxPlayer.character.craft.push({ item: { ...item, rarity: 'Common', objectId: uuid(), inv: 'C' }, inv: 'C', time: Time().time + recipe.time, profession: recipe.profession, xp: recipe.xp })
            auxAmount -= 1
        }
    } else {
        auxPlayer.character.craft.push({ item: { ...item, objectId: uuid(), amount: amount * recipe.amount, inv: 'C' }, inv: 'C', time: Time().time + (recipe.time * amount), profession: recipe.profession, xp: recipe.xp * amount })
    }
    return auxPlayer
}

export function CraftInv(player, item) {
    console.log(item)
    let auxPlayer = JSON.parse(JSON.stringify(player))
    if (auxPlayer.character.inventori.length < auxPlayer.character.invCap) {
        const index = auxPlayer.character.craft.indexOf(auxPlayer.character.craft.find(elem => elem.item.objectId === item.item.objectId))
        auxPlayer.character.inventori = AddtoInv(auxPlayer.character.inventori, { ...item.item, inv: 'I' })
        auxPlayer.character.craft.splice(index, 1)
        auxPlayer = SkillExp(auxPlayer, item.profession, item.xp)
    }
    return (auxPlayer)
}