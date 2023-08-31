import Items from "../JSON/Items.json"
import InfoWindow from "./InfoWindow"
import RecipeCard from "./RecipeCard"
import { CraftAmount, RecipeDb } from "../Scripts/InventoriControl"
import { useState } from "react"
import ItemSlot from "./ItemSlot"
import { Craft } from "../Scripts/ItemControl"

const WorkStation = ({ player, setPlayer, setBlurWindow, term }) => {
    const [recipeInfo, setRecipeInfo] = useState()
    const recipesDb = RecipeDb(term)
    const handleIMenu = (item) => {
        let auxArray = JSON.parse(JSON.stringify(item))
        let invCap = auxArray[0].type !== 'Weapon' && auxArray[0].type !== 'Armor' &&  auxArray[0].type !== 'Tool' ? (5 - player.character.craft.length)*20 : 5 - player.character.craft.length
        auxArray.push(CraftAmount(player.character.inventori, invCap, auxArray[1].mats))
        auxArray.push(1)
        setRecipeInfo(auxArray)
    }
    const handleOnChange = () => {
        let auxRecipeInfo = JSON.parse(JSON.stringify(recipeInfo))
        auxRecipeInfo[3] = Number(event.target.value)
        setRecipeInfo(auxRecipeInfo)
    }
    const handleCraft = () => {
        setPlayer(Craft(player, recipeInfo[0], recipeInfo[1], recipeInfo[3]))
        setBlurWindow()
    }
    return (
        <div className="blur">
            <div className="workStation">
                <div className="workStation-header">
                    <span id="closeBtn" onClick={() => setBlurWindow(null)}>Close</span>
                    <h2>{term}</h2>
                </div>
                <div className="workStation-body">
                    <div className="recipeNav">
                        {recipesDb.map(elem => {
                            return (<RecipeCard player={player} setPlayer={setPlayer} recipe={elem} handleIMenu={handleIMenu} />)
                        })}
                    </div>
                    <div className="recipeInfo">
                        {recipeInfo === undefined ? null :
                            <>
                                <span className="recipeInfo-header">
                                    <ItemSlot item={recipeInfo[0]} />
                                    <span className="headerText">
                                        <span id="name" >{recipeInfo[0].rarity} {recipeInfo[0].name}</span>
                                        <span id="desc" >{recipeInfo[0].desc}</span>
                                    </span>
                                </span>
                                {/* <span className="recipeInfo-header">
                                    <ItemSlot item={recipeInfo[0]} />
                                    {/* <img className="itemImg" src={recipeInfo[0].img} alt={recipeInfo[0].name} /> 
                                <span className="text">

                                </span>
                            </span> */}
                                <span className="recipeInfo-body">
                                    <span>Type: {recipeInfo[0].type}</span>
                                    {recipeInfo[0].slot !== undefined ? <span>Slot: {recipeInfo[0].slot}</span> : null}
                                    {recipeInfo[0].class !== undefined ? <span>Class: {recipeInfo[0].class}</span> : null}
                                    {recipeInfo[0].damage !== undefined ? <span>Damage: {recipeInfo[0].damage}</span> : null}
                                    {recipeInfo[0].defense !== undefined ? <span>Defense: {recipeInfo[0].defense}</span> : null}
                                    {recipeInfo[0].action !== undefined ? <span>{recipeInfo[0].action.type}: {recipeInfo[0].action.amount} </span> : null}
                                </span>
                                <span className="recipeInfo-footer">
                                    {recipeInfo[1].mats.map(mat => {
                                        return (<ItemSlot item={mat} />
                                        )
                                    })}
                                </span>
                                <span className="recipeInfo-button">
                                    {recipeInfo[0].type !== 'Weapon' && recipeInfo[0].type !== 'Armor' && recipeInfo[0].type !== 'Tool' && recipeInfo[2] > 1 ?
                                        <>
                                            <form>
                                                <input style={{width: `${recipeInfo[2]*5}px`}} id="craft-range" type="range" min={1} max={recipeInfo[2]} value={recipeInfo[3]} onChange={() => handleOnChange()} ></input>
                                            </form>
                                        </> : null}
                                    {recipeInfo[2] > 0 ? <span className="button" onClick={() => handleCraft()} >Craft {recipeInfo[3]}</span> : <span> No Materials</span>}
                                </span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
export default WorkStation