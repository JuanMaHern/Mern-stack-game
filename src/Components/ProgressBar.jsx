const ProgressBar = ({ Max, Value, Color, Source }) => {
    
    const msj = Source === 'Lvl' ? `${Source}: ${Math.sqrt(Max / 100)}` : `${Source}: ${Value} / ${Max}`
    const percent = Value * 120 / Max
    return (
        <div  className="progressContainer"><div style={{ width: percent, backgroundColor: Color }} className="progressBar"><span className="pb-value">{msj}</span></div></div>
    )
}
export default ProgressBar