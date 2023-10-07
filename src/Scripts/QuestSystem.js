import WorldConfig from "../JSON/WorldConfig.json"
import itemDb from "../JSON/Items.json"
import { v4 as uuid } from "uuid"
import { AddtoInv } from "./InventoriControl"

const Reward = ( player, xpR, goldR, itemR ) => {
    let auxPlayer = JSON.parse(JSON.stringify(player))
    auxPlayer.character.exp += xpR
    auxPlayer.character.gold += goldR
    for (let item of itemR){
        let db = itemDb.find(elem => elem.id === item.id)
        let auxItem = {...db, ...item, objectId: uuid(), inv:'I'}
        auxPlayer.character.inventori = AddtoInv(auxPlayer.character.inventori, auxItem)
    }
    return auxPlayer
}

export function QuestFetch(player, term) {
    /* term = {type: "Kill", id: 1, amount: 1} */
    let auxPlayer = JSON.parse(JSON.stringify(player))
    const questsDb = WorldConfig[0].Quests
    let auxQuest = undefined
    for (let quest of questsDb){
        if(quest.Type === term.type && quest.Req.id === term.id){
            auxQuest = quest
        }
    }
    let playerQuest = auxQuest !== undefined? auxPlayer.character.quests.find(elem => elem.id === auxQuest.id): undefined
    if(playerQuest !== undefined && playerQuest.status !== 'Completed'){
        const qIndex = auxPlayer.character.quests.indexOf(playerQuest)
        auxPlayer.character.quests[qIndex].reqAmount += term.amount
        console.log(`Quest Updated (${auxPlayer.character.quests[qIndex].reqAmount} / ${auxQuest.Req.amount})`)
        if(auxPlayer.character.quests[qIndex].reqAmount >= auxQuest.Req.amount){
            auxPlayer.character.quests[qIndex].status = 'Completed'
            auxPlayer.character.quests[qIndex].reqAmount = auxQuest.Req.amount
            auxPlayer = Reward(auxPlayer, auxQuest.XpR, auxQuest.GoldR, auxQuest.ItemR)
            console.log('Quest Completed')
        }
    }
    return auxPlayer

}