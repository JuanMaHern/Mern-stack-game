export function AddtoInv (inv, item) {
    let auxInv = JSON.parse(JSON.stringify(inv))
    if (item.type === 'Weapon' || item.type === 'Armor'){
        auxInv.push(item)
    } else{ 
        let auxItem = undefined
        let auxAmount = item.amount
        for ( let elem of auxInv){ 
            if (elem.id === item.id && elem.amount < 20 && auxItem === undefined){
                auxItem = elem
                if (auxItem.amount + auxAmount > 20){
                    auxAmount = auxItem.amount + auxAmount- 20
                    auxInv[auxInv.indexOf(elem)].amount = 20
                    auxItem = undefined
                } else {
                    auxInv[auxInv.indexOf(elem)].amount += auxAmount
                }
            }
        }
        if (auxItem === undefined) {
            auxInv.push({...item, amount: auxAmount})
        }
    }
    return auxInv
}