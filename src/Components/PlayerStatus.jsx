const PlayerStatus = ({ player }) => {
    let skillArray= []
    for (const [key, value] of Object.entries(player.skills)) {
        skillArray.push({ key, ...value })
    }
    return (
        <div className="playerStatus">
            <div>
                <span>Atributes</span>
                <p>Str: {player.atributes.Str}</p>
                <p>Const: {player.atributes.Const}</p>
                <p>Int: {player.atributes.Int}</p>
                <p>Agi: {player.atributes.Agi}</p>
                <p>Wis: {player.atributes.Wis}</p>
                <p>Cha: {player.atributes.Cha}</p>

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