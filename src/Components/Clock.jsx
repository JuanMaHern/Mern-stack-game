const Clock = ({time}) => {
    return (
        <div className="clock">
            <div>{time.day <= 9 ? `0${time.day}` : time.day}/{time.month <= 9 ? `0${time.month}`: time.month}/{time.year}</div>
            <div>{time.season}</div>
            <div>{time.hours<= 9? `0${time.hours}`:time.hours}:{time.minutes <=9 ? `0${time.minutes}`: time.minutes}</div>
            
        </div>
    )
}
export default Clock