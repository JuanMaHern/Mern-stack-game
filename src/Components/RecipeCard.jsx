import { Craft, DbItem, ItemAmount } from "../Scripts/ItemControl"

const RecipeCard = ({ player, setPlayer, recipe }) => {
    let recipeItem = DbItem(recipe.id)
    let terms = {proffesion : recipe.proffesion, lvl: recipe.lvl}
    let recipeMatts = []
    for (let mat of recipe.materials){
        let auxMat = DbItem(mat.id)
        recipeMatts.push({id: mat.id, img: auxMat.img, amount: mat.amount})
    } 
    const handleCraft = () => {
        let mats = true
        for (let elem of recipeMatts){
            ItemAmount(player.character.inventori, elem.id, elem.amount)? null: mats=false
        }
        if(mats === true){
            setPlayer(Craft(player, recipeItem, recipeMatts, terms))
        }
    }
    return (
        <div className="recipeCard">
            <span><img className="itemImg" src={recipeItem.img} alt={recipeItem.name} /></span>
            <span>
                {recipeMatts.map(mat => {
                    return(
                        <img className="itemImg" src={mat.img} alt={mat.id} />
                    )
                })}
            </span>
            <span style={{cursor: 'pointer'}} onClick={() => handleCraft()}>Craft</span>
        </div>
    )
}
export default RecipeCard