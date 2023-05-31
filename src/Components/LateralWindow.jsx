import Inventori from "./Inventori"

const LateralWindow = ({ player, setPlayer }) => {
    return(
        <div className="lateralWindow">
            <span>Equipment</span>
            <Inventori inventori={player.character.equipment} invCap={10} />
            <span>Inventori {player.character.inventori.length}/{player.character.invCap}</span>
            <Inventori inventori={player.character.inventori} invCap={player.character.invCap} />
        </div>
    )
}
export default LateralWindow