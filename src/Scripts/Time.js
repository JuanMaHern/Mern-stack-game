const Season = (time) => {
    const seasons = ['Spring','Summer', 'Autumn', 'Winter']
    const timePased = Math.floor(((time.getTime()-1693191600000)/86400000)/7)
    return seasons[timePased%4]
}

export function Time () {
    /* Start : 1693191600000 */
    const now = new Date()
    const utc = new Date(now.toUTCString().slice(0, -4));
    return { day: utc.getDate(), month: utc.getMonth(), year: utc.getFullYear(), hours: utc.getHours(), minutes: utc.getMinutes(), season: Season(utc), time: utc.getTime()}

}