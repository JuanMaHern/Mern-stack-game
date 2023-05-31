import {v4 as uuid} from 'uuid'
import itemDb from '../JSON/Items.json'

export function FillInventori(inventori ,cap){
    const Db = itemDb
    const inv = cap <= 10 ? 'E': 'I'
    let auxInv = []
    for(let i=0; i < cap; i++){
        if(inventori[i] !== undefined){
            const DbObject = Db.find(elem => elem.id === inventori[i].id)
            auxInv.push({...inventori[i], img: DbObject.img, inv: inv})
        } else {
            auxInv.push({name: '?', objectId: uuid()})
        }
    }
    return auxInv
}