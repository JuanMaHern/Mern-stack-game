import { Craft, DbItem, ItemAmount } from "../Scripts/ItemControl"
import ItemSlot from "./ItemSlot"

const RecipeCard = ({ player, setPlayer, recipe, handleIMenu }) => {
    let recipeItem = DbItem(recipe.id)
    let recipeMats = []
    for (let mat of recipe.materials){
        let auxMat = DbItem(mat.id)
        recipeMats.push({name: auxMat.name, id: mat.id, img: auxMat.img, amount: mat.amount})
    } 
    return (
        <div className="recipeCard" onClick={() => handleIMenu([recipeItem, {profession : recipe.profession, lvl: recipe.lvl, xp: recipe.xp, mats: recipeMats, time: recipe.time}])}>
            <ItemSlot item={recipeItem} />
            <span className="matts">
                {recipeMats.map(mat => {
                    return(<ItemSlot item={mat} />
                    )
                })}
            </span>
        </div>
    )
}
export default RecipeCard