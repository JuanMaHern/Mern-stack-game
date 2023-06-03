const PlayerStatus = ({ player }) => {
    let skillArray= []
    for (const [key, value] of Object.entries(player.skills)) {
        skillArray.push({ key, ...value })
    }
    return (
        <div className="playerStatus">
            <div>
                <span>Atributes</span>
                <p>Str: {player.atributes.str}</p>
                <p>Const: {player.atributes.const}</p>
                <p>Int: {player.atributes.int}</p>
                <p>Agi: {player.atributes.agi}</p>
                <p>Wis: {player.atributes.wis}</p>
                <p>Cha: {player.atributes.cha}</p>

            </div>
            <div>
                <span>Skills</span>
                {skillArray.map((skill) => {
                    return <p key={skill.key}>{skill.key}: {skill.Level}</p>
                })}
            </div>
        </div>
    )
}
export default PlayerStatus