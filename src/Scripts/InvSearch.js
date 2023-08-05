export function InvProfSearch (inv, term) {
    const item = inv.find(elem => elem.proffesion === term)
    return item !== undefined ? true: false
}