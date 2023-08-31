import { EquipAtribCalc } from "../Scripts/PlayerControl"

const PlayerStatus = ({ player, setPlayer }) => {
    let skillArray= []
    let atribArray = []
    for (const [key, value] of Object.entries(player.character.atributes)) {
        atribArray.push({ key, value: value })
    }
    /* const addAtrib = player.character.atribPoints !== 0? <span onClick={() => handleAtribAdd()}>+</span> : null */
    for (const [key, value] of Object.entries(player.character.skills)) {
        skillArray.push({ key, ...value })
    }
    const handleAtribAdd = (atribute) => {
        let auxPlayer = JSON.parse(JSON.stringify(player))
        auxPlayer.character.atributes[atribute] += 1
        auxPlayer.character.atribPoints -= 1
        setPlayer(EquipAtribCalc(auxPlayer))
    }
    return (
        <div className="playerStatus">
            <div>
                <h4>Atributes</h4>
                {atribArray.map ((atribute) => {
                    return <span key={atribute.key}>{atribute. key}: {atribute.value}  {player.character.atribPoints >0? <span onClick={() => handleAtribAdd(atribute.key)}>+</span> : null} </span>
                })}
                {/* <span>Str: {player.character.atributes.str}  {addAtrib}</span>
                <span>Const: {player.character.atributes.const}  {addAtrib}</span>
                <span>Int: {player.character.atributes.int}  {addAtrib}</span>
                <span>Agi: {player.character.atributes.agi}  {addAtrib}</span>
                <span>Wis: {player.character.atributes.wis}  {addAtrib}</span>
                <span>Cha: {player.character.atributes.cha}  {addAtrib}</span> */}

            </div>
            <div>
                <h4>Skills</h4>
                {skillArray.map((skill) => {
                    return <p key={skill.key}>{skill.key}: {skill.Level} ({skill.Xp} / {100*skill.Level*skill.Level})</p>
                })}
            </div>
        </div>
    )
}
export default PlayerStatus