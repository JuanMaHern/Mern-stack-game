import Resources from "../JSON/Resources.json"

export function FetchResources (array) {
    let auxResources = [0,1,2,3,4,5]
    for (let i = 0; i< array.length; i++){
        auxResources[i] = Resources.find(elem => elem.id === array[i].resourceId)
    }
    return (auxResources)
}