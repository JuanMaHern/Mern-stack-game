import itemDb from "../JSON/Items.json"

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
export function InvProfSearch(inv, term) {
    const item = inv.find(elem => elem.proffesion === term)
    return item
}

/* Add item to Inventori */
export function AddtoInv(inv, item) {
    console.log(item)
    let auxInv = JSON.parse(JSON.stringify(inv))
    if (item.type === 'Weapon' || item.type === 'Armor' || item.type === 'Tool') {
        auxInv.push({...item, inv: 'I'})
    } else {
        let auxItem = undefined
        let auxAmount = item.amount
        for (let elem of auxInv) {
            if (elem.id === item.id && elem.amount < 20 && auxItem === undefined) {
                auxItem = elem
                if (auxItem.amount + auxAmount > 20) {
                    auxAmount = auxItem.amount + auxAmount - 20
                    auxInv[auxInv.indexOf(elem)].amount = 20
                    auxItem = undefined
                } else {
                    auxInv[auxInv.indexOf(elem)].amount += auxAmount
                }
            }
        }
        if (auxItem === undefined) {
            for (let i = auxAmount; i >= 1; i -= 20) {
                auxInv.push({ ...item, amount: i > 20 ? 20 : i, inv: 'I' })
            }
        }
    }
    console.log(auxInv)
    return auxInv
}

/* Add array to Inv */
export function AddArraytoInv(inv, array) {
    let auxArray = JSON.parse(JSON.stringify(inv))
    for (let elem of array) {
        AddtoInv(auxArray, elem)
    }
    console.log(auxArray)
    return auxArray
}

/* Fill inventori slots from array */
export function FillInventori(inventori, cap, source) {
    let auxInv = []
    if (source === 'E') {
        let order = ['Right-hand', 'Left-hand', 'Head', 'Armor', 'Belt', 'Boots']
        for (let i = 0; i < cap; i++) {
            if (i === 0) {
                const auxItem = inventori.find(elem => elem.type === 'Weapon')
                auxItem === undefined ? auxInv.push('?') : auxInv.push(auxItem)
            } else {
                if (i >= 6) {
                    const auxItem = inventori.find(elem => elem.type === 'Consumable')
                    auxItem === undefined ? auxInv.push('?') : auxInv.push(auxItem)
                } else {
                    const auxItem = inventori.find(elem => elem.slot === order[i])
                    auxItem === undefined ? auxInv.push('?') : auxInv.push(auxItem)
                }
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