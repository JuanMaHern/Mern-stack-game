import Recipes from "../JSON/Recipes.json"
import Items from "../JSON/Items.json"
import RecipeCard from "./RecipeCard"

const Forge = ({ player, setPlayer }) => {
    const recipesDb = JSON.parse(JSON.stringify(Recipes[0]))
    return(
        <div className="forge">
            {recipesDb.map(elem => {
                console.log(elem)
                return(<RecipeCard player={player} setPlayer={setPlayer} recipe={elem} />)
            })}

        </div>
    )
}
export default Forge