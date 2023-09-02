import Entities from "../JSON/Entities.json"

export function EnemyGen() {
    return ({ ...Entities[0], type: 'Enemy' })
}