export function FillInventori(inventori, cap) {
    const inv = cap <= 10 ? 'E' : 'I'
    let auxInv = []
    if (inv === 'I') {
        for (let i = 0; i < cap; i++) {
            if (inventori[i] !== undefined) {
                auxInv.push(inventori[i])
            } else {
                auxInv.push('?')
            }
        }
    } else {
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
    }

    return auxInv
}