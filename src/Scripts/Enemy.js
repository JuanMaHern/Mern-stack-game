import Entities from "../JSON/Entities.json"

export function EnemyGen() {
    /* const EnemyDb = JSON.parse(JSON.stringify(Entities)) */
    /* let auxEnemy = Entities[0] */
    /* const auxLvl = Math.floor(Math.random()*3 + 1)
    auxEnemy.lvl = auxLvl
    auxEnemy.pv *= auxLvl
    auxEnemy.exp *= auxLvl
    auxEnemy.dmg *= auxLvl
    auxEnemy.def *= auxLvl
    auxEnemy.gold *= auxLvl */
    return ({ ...Entities[0], type: 'Enemy' })
}