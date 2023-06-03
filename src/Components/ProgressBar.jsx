const ProgressBar = ({ Max, Value }) => {
    const percent = Value*100/Max
    return (
        <div className="progressContainer"><div style={{width: percent}} className="progressBar"></div></div>
    )
}
export default ProgressBar