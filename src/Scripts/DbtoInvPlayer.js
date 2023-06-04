import itemDb from '../JSON/Items.json'

const atribMultip = (item) => {
    let auxItem = JSON.parse(JSON.stringify(item))
    const multip = auxItem.rarity === 'Legendary' ?
        2.5 : auxItem.rarity === 'Epic' ? 2 : auxItem.rarity === 'Rare' ? 1.5 : 1
    if (auxItem.type === 'Weapon') {
        auxItem.damage = Math.floor(auxItem.damage*multip)
    }
    if (auxItem.type === 'Armor') {
        auxItem.defense = Math.floor(auxItem.defense*multip)
    }
    auxItem.price = Math.floor(auxItem.price*multip)
    return auxItem
}

export function DbtoInvPlayer(player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    let auxInv = []
    let auxEquip = []
    for (let inv of player.character.inventori) {
        let auxItem = itemDb.find(elem => elem.id === inv.id)
        let finalItem = atribMultip({ ...inv, ...auxItem, inv: 'I' })
        auxInv.push(finalItem)
    }
    for (let equip of player.character.equipment) {
        let auxItem = itemDb.find(elem => elem.id === equip.id)
        let finalItem = atribMultip({ ...equip, ...auxItem, inv: 'E' })
        auxEquip.push(finalItem)
    }
    auxPlayer.character.inventori = auxInv
    auxPlayer.character.equipment = auxEquip
    return auxPlayer
}