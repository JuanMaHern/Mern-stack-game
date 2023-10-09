import itemDb from "../JSON/Items.json"
import Recipes from "../JSON/Recipes.json"
import { v4 as uuid } from "uuid"
import { ItemAmount } from "./ItemControl"

/* item rarity multiplier */
const atribMultip = (item) => {
    let auxItem = JSON.parse(JSON.stringify(item))
    const multip = auxItem.rarity === 'Legendary' ?
        2.5 : auxItem.rarity === 'Epic' ? 2 : auxItem.rarity === 'Rare' ? 1.5 : 1
    if (auxItem.type === 'Weapon') {
        auxItem.damage = Math.floor(auxItem.damage * multip)
    }
    if (auxItem.type === 'Armor') {
        auxItem.defense = Math.floor(auxItem.defense * multip)
    }
    auxItem.price = Math.floor(auxItem.price * multip)
    return auxItem
}

/* Load DataBase to Inventori */
export function DbToInv(inv, source) {
    let arrayDb = []
    for (let elem of inv) {
        let auxElem = itemDb.find(item => item.id === elem.id)
        arrayDb.push(atribMultip({ ...elem, ...auxElem, inv: source }))
    }
    return arrayDb
}

/* player has or not tool for resource  */
export function InvProfSearch(player, term) {
    const item = player.character.equipment.find(elem => elem.proffesion === term)
    return item
}

/* Add item to Inventori */
export function AddtoInv(inv, item) {
    let auxInv = JSON.parse(JSON.stringify(inv))
    if (item.type === 'Weapon' || item.type === 'Armor' || item.type === 'Tool' || item.type === 'Container') {
        auxInv.push(item)
    } else {
        let auxItem = undefined
        let auxAmount = item.amount
        for (let elem of auxInv) {
            if (elem.id === item.id && elem.amount < 100 && auxItem === undefined) {
                auxItem = elem
                if (auxItem.amount + auxAmount > 100) {
                    auxAmount = auxItem.amount + auxAmount - 100
                    auxInv[auxInv.indexOf(elem)].amount = 100
                    auxItem = undefined
                } else {
                    auxInv[auxInv.indexOf(elem)].amount += auxAmount
                }
            }
        }
        if (auxItem === undefined) {
            for (let i = auxAmount; i >= 1; i -= 100) {
                auxInv.push({ ...item, amount: i > 100 ? 100 : i, objectId: uuid() })
            }
        }
    }
    return auxInv
}

/* Fill inventori slots from array */
export function FillInventori(inventori, cap, source) {
    let auxInv = []
    if (source === 'E') {
        let order = ['Right-hand', 'Left-hand', 'Head', 'Armor', 'Belt', 'Boots', 'Axe', 'Pickaxe']
        for (let i = 0; i < cap; i++) {
            if (i === 0) {
                const auxItem = inventori.find(elem => elem.type === 'Weapon')
                auxItem === undefined ? auxInv.push('?') : auxInv.push(auxItem)
            } else {
                const auxItem = inventori.find(elem => elem.slot === order[i])
                auxItem === undefined ? auxInv.push('?') : auxInv.push(auxItem)
            }
        }

    } else {
        for (let i = 0; i < cap; i++) {
            if (inventori[i] !== undefined) {
                auxInv.push(inventori[i])
            } else {
                auxInv.push('?')
            }
        }
    }

    return auxInv
}

/* Inventori loader from the start of game */
export function DbtoInvPlayer(player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    auxPlayer.character.inventori = DbToInv(auxPlayer.character.inventori, "I")
    auxPlayer.character.equipment = DbToInv(auxPlayer.character.equipment, "E")
    return auxPlayer
}

export function RecipeDb(term) {
    const db = JSON.parse(JSON.stringify(Recipes))
    switch (term) {
        case 'Smelter':
            return db[0]
            break
        case 'Sawmill':
            return db[1]
            break
        case 'Skining Rack':
            return db[2]
            break
        case 'Loom':
            return db[3]
            break
        case 'Stone Cutter':
            return db[4]
            break
        case 'Forge':
            return db[5]
            break
        case 'Furnace':
            return db[6]
            break
            case 'Cauldron':
            return db[7]
            break
        case 'Work Station':
            return db[8]
            break
    }

}

export function CraftAmount (array, mats) {
    let matsAmount = []
    let amount = 99999
    for (let mat of mats){
        matsAmount.push({id: mat.id, amount: ItemAmount(array, mat.id)})
    }
    for (let mat of matsAmount){
        const auxMat = mats.find(elem => elem.id === mat.id)
        const auxAmount = Math.floor(mat.amount / auxMat.amount)
        auxAmount < amount ? amount = auxAmount : null
    }
    return amount

}

export function InvTypeFilter (array, type) {
    let auxArray = []
    for (let item of array){
        if(item.type === type){
            auxArray.push(item)
        }
    }
    return auxArray
}