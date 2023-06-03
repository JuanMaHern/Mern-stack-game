import itemDb from '../JSON/Items.json'

export function DbtoInvPlayer (player) {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    let auxInv = []
    let auxEquip = []
    for (let inv of player.character.inventori){
        let auxItem = itemDb.find(elem => elem.id === inv.id)
        auxInv.push({...inv, ...auxItem, inv: 'I'})
    }
    for (let equip of player.character.equipment){
        let auxItem = itemDb.find(elem => elem.id === equip.id)
        auxEquip.push({...equip, ...auxItem, inv: 'E'})
    }
    auxPlayer.character.inventori = auxInv
    auxPlayer.character.equipment = auxEquip
    return auxPlayer
}