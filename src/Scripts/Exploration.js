import Entities from "../JSON/Entities.json"
import Resources from "../JSON/Resources.json"
import WorldConfig from "../JSON/WorldConfig.json"

const DbLoader = (enemies, resources) => {
    let loadedArray = []
    for (let indx of enemies){
        loadedArray.push({...Entities.find(elem => elem.id === indx), type: 'Enemy'})
    }
    for (let indx of resources){
        const res = Resources.find(elem => elem.id === indx)
        const type = res.proffesion !== undefined ? {type: 'Resource'}: {type: 'Loot'}
        loadedArray.push({...res, ...type})
    }
    return loadedArray
}

export function ExplorationGen (Location) {
    let auxLocation = {}
    let expEncounter = []
    for (let loc of WorldConfig[0].Exploration){
        if (loc.Location === Location){
            auxLocation = loc
        }
    }
    expEncounter = DbLoader(auxLocation.Enemies, auxLocation.Resources)
    let explorationEntities = []
    for (let i = 0; i<= 9; i++){
        explorationEntities.push({...expEncounter[Math.floor(Math.random()*expEncounter.length)], indx: i})
    }
    return explorationEntities
}