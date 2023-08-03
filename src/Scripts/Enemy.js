import Entities from "../JSON/Entities.json"
import Resources from "../JSON/Resources.json"

export function EnemyGen (player, terms) {
    const EnemyDb = JSON.parse(JSON.stringify(Entities))
    if (terms === 'Arena'){
        let auxEnemy = EnemyDb[Math.floor(Math.random()*EnemyDb.length)]
        const auxLvl = Math.floor(Math.random()*3 + player.character.lvl)
        auxEnemy.lvl = auxLvl
        auxEnemy.pv *= auxLvl
        auxEnemy.exp *= auxLvl
        auxEnemy.dmg *= auxLvl
        auxEnemy.def *= auxLvl
        auxEnemy.gold *= auxLvl
        return ({...auxEnemy, type: 'Enemy'})
    }
}