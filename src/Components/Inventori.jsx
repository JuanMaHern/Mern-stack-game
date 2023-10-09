import { useEffect, useState } from "react"
import { FillInventori } from "../Scripts/InventoriControl"
import ItemSlot from "./ItemSlot"
import { v4 as uuid } from 'uuid'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi"

const Inventori = ({ inventori, invCap, handleIMenu, source, now }) => {
    const InvFilled = FillInventori(inventori, invCap, source)
    const [actInv, setActInv] = useState(InvFilled)
    const [index, setIndex] = useState(0)
    const style = {}

    const letInv = (value) => {
        let auxInv = []
        for (let i = value; i < InvFilled.length; i++) {
            auxInv.push(InvFilled[i])
        }
        setIndex(value)
        setActInv(auxInv)
    }

    useEffect(() => {
        letInv(index)
    }, [inventori])


    return (
        <div className="inventori" >
            <div className="inventori-container" style={source === 'E' ? { height: '66px' } : source === 'C' ? { height: '33px' } : source === 'F' ? {width: '66px', height: '186px'}:{height: '132px' }}>
                {actInv.map(item => {
                    return (<ItemSlot key={item !== '?' ? item.objectId === undefined ? item.id : item.objectId : uuid()} item={item} handleIMenu={handleIMenu} now={now} />)
                })}
            </div>
            <div className="inventori-button">
                <span style={{width: '20px'}}>{source === 'I' && index > 0 ? <HiArrowNarrowLeft onClick={() => letInv(index - 20)} /> : null}</span>
                {source === 'I' && invCap > 20 ? <span>page {index/20 +1}</span> : null}
                <span style={{width: '20px'}}>{source === 'I' && invCap > index + 20  ? <HiArrowNarrowRight onClick={() => letInv(index + 20)} /> : null}</span>
                
                {/* {source === 'I' && index > 0 ? <span onClick={() => letInv(index - 20)} >Ant</span> : null} */}
                {/* {source === 'I' && invCap > index + 20 ? <span onClick={() => letInv(index + 20)} >Next</span> : null} */}
            </div>
        </div>
    )
}
export default Inventori