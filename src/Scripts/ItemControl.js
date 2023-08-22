import { AddtoInv } from "./InventoriControl"
import { EquipAtribCalc } from "./PlayerControl"
import { v4 as uuid } from "uuid"
import itemDb from "../JSON/Items.json"
import { randomRarity } from "./LootControl"

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
    let auxItem = item.type === 'Weapon' || item.type === 'Armor' || item.type === 'Tool'? item : { ...item, amount: Number(amount) }
    auxPlayer.character.stash = AddtoInv(auxPlayer.character.stash, { ...auxItem, inv: 'PS' })
    if (item.amount === undefined ||item.amount === Number(amount)){
        auxPlayer = DeleteItem(item, auxPlayer)
    } else{
        let index = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(elem => elem.objectId === item.objectId))
        auxPlayer.character.inventori[index].amount -= amount
    }
    return auxPlayer

}
export function Take(item, player, amount) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    let auxItem = item.type === 'Weapon' || item.type === 'Armor' ? item : { ...item, amount: Number(amount) }
    auxPlayer.character.inventori = AddtoInv(auxPlayer.character.inventori, { ...auxItem, inv: 'I' })
    if (item.amount === undefined ||item.amount === Number(amount)){
        auxPlayer = DeleteItem(item, auxPlayer)
    } else{
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

export function DbItem(id){
    return itemDb.find(elem => elem.id === id)
}

export function ItemAmount(array, id, amount){
    let auxAmount = 0
    for(let elem of array){
        if(elem.id === id){
            auxAmount += elem.amount
        }
    }
    return auxAmount >= amount? true: false
}

export function FindArrayItems (array, id){
    let auxArray = []
    for(let item of array){
        if(item.id === id){
            auxArray.push(item)
        }
    }
    return auxArray
}

export function Craft (player, item, mats, terms){
    let auxPlayer = JSON.parse(JSON.stringify(player))
    for(let mat of mats){
        if(mat.amount < 20){
            let auxIndex = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(elem => elem.id === mat.id))
            auxPlayer.character.inventori[auxIndex].amount -= mat.amount
        } else {
            let auxArray = FindArrayItems(player.character.inventori, mat.id)
            let auxAmount = 0
            for (let i = 0 ; i< auxArray.length; i++){
                let auxIndex = auxPlayer.character.inventori.indexOf(auxPlayer.character.inventori.find(elem => elem.objectId === auxArray[i].objectId))
                if(auxArray[i].amount <= (mat.amount - auxAmount)){
                    auxPlayer.character.inventori.splice(auxIndex,1)
                    auxAmount += auxArray[i].amount    
                } else {
                    auxPlayer.character.inventori[auxIndex].amount -= (mat.amount - auxAmount)
                    auxAmount = mat.amount
                }
            }
        }
    }
    /* Necesito calcular para la xp de la profesion */
    /* let skillArray = []
    for (const [key, value] of Object.entries(auxPlayer.character.skills)) {
        skillArray.push({ key, ...value })
    }
    console.log(skillArray)
    console.log(terms.proffesion)
    console.log(auxPlayer.character.skills[terms.proffesion]) */
    let rar = randomRarity(1)
    const atrib = item.type === 'Weapon' ?
                { rarity: rar.rar, damage: Math.floor(item.damage * rar.multip) } :
                item.type === 'Armor' ? { rarity: rar.rar, defense: Math.floor(item.defense * rar.multip) } : 
                null
    auxPlayer.character.inventori = AddtoInv(auxPlayer.character.inventori,{...item,...atrib, inv: 'I', objectId: uuid()})
    return auxPlayer
    
}