export function AddtoInv (inv, item) {
    let auxInv = JSON.parse(JSON.stringify(inv))
    if (item.type === 'Weapon' || item.type === 'Armor'){
        auxInv.push(item)
    } else{ 
        let auxItem = undefined
        for ( let elem of auxInv){ 
            if (elem.id === item.id && elem.amount < 20 && auxItem === undefined){
                auxItem = elem
                auxInv[auxInv.indexOf(elem)].amount += 1
            }
        }
        if (auxItem === undefined) {
            auxInv.push(item)
        }
    }
    return auxInv
}