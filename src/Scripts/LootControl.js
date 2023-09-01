import { v4 as uuid } from "uuid"
import itemDb from "../JSON/Items.json"

const dropRate = (percent) => {
    const auxRandom = Math.floor(Math.random() * 100 + 1)
    return percent >= auxRandom ? true : false
}

export function randomRarity (term) {
    const auxRandom = Math.floor(Math.random() * 100 + (1*term))
    return auxRandom < 50 ?
        { rar: 'Common', multip: 1 } :
        auxRandom < 75 ?
            { rar: 'Rare', multip: 1.5 } :
            auxRandom < 88 ?
                { rar: 'Epic', multip: 2 } :
                { rar: 'Legendary', multip: 2.5 }
}

export function Loot(array) {
    let auxLoot = []
    for (let item of array) {
        if (dropRate(item.prcn)) {
            const auxItem = itemDb.find(elem => elem.id === item.id)
            const auxRarity = randomRarity(1)
            const atrib = auxItem.type === 'Weapon' ?
                { rarity: auxRarity.rar, damage: Math.floor(auxItem.damage * auxRarity.multip) } :
                auxItem.type === 'Armor' ? { rarity: auxRarity.rar, defense: Math.floor(auxItem.defense * auxRarity.multip) } : 
                auxItem.type === 'Tool' ? {}:
                    { amount: Math.ceil(Math.random()*item.amount) }
            auxLoot.push({ ...auxItem, ...atrib, inv: 'I', price: Math.floor(auxItem.price * auxRarity.multip), objectId: uuid() })
        }
    }
    for (let i = auxLoot.length; i < 8; i++) {
        auxLoot.push('?')
    }
    return auxLoot
}

export function ResourceLoot(array) {
    let auxLoot = []
    for (let item of array) {
        if (dropRate(item.prcn)) {
            const auxItem = itemDb.find(elem => elem.id === item.id)
            const amount = auxItem.type === "Material" ? { amount: Math.floor(Math.random() * 3 + 1) } : auxItem.type === "Tool" ? null : { amount: 1 }
            auxLoot.push({ ...auxItem, inv: 'I', objectId: uuid(), ...amount })
        }
    }
    return auxLoot
}