import { v4 as uuid } from "uuid"
import itemDb from "../JSON/Items.json"

const dropRate = (percent) => {
    const auxRandom = Math.floor(Math.random() * 100 + 1)
    return percent >= auxRandom ? true : false
}

const randomRarity = () => {
    const auxRandom = Math.floor(Math.random() * 100 + 1)
    return auxRandom < 50 ?
        { rar: 'Common', multip: 1 } :
        auxRandom < 75 ?
            { rar: 'Rare', multip: 1.5 } :
            auxRandom < 88 ?
                { rar: 'Epic', multip: 2 } :
                { rar: 'Legendary', multip: 2.5 }
}

export function Loot(enemy) {
    let auxLoot = []
    for (let item of enemy.loot) {
        if (dropRate(item.prcn)) {
            const auxItem = itemDb.find(elem => elem.id === item.id)
            const auxRarity = randomRarity()
            const atrib = auxItem.type === 'Weapon' ?
                { rarity: auxRarity.rar, damage: Math.floor(auxItem.damage * auxRarity.multip) } :
                auxItem.type === 'Armor' ? { rarity: auxRarity.rar, defense: Math.floor(auxItem.defense * auxRarity.multip) } :
                    {amount: 1}
            auxLoot.push({ ...auxItem, ...atrib, inv: 'I', price: Math.floor(auxItem.price * auxRarity.multip), objectId: uuid() })
        }
    }
    for (let i = auxLoot.length; i < 8; i++){
        auxLoot.push('?')
    }
    return auxLoot
}

export function ResourceLoot(resource) {
    let auxLoot = []
    for (let item of resource.loot) {
        if (dropRate(item.prcn)) {
            const auxItem = itemDb.find(elem => elem.id === item.id)
            const amount = auxItem.type === "Material" ? {amount: Math.floor(Math.random() * 3 + 1)} : null
            auxLoot.push({...auxItem, inv: 'I', objectId: uuid(), ...amount })
        }
    }
    return auxLoot
}