import styles from "./burgerIngredients.module.css";
import { data } from "../../utils/data";
import BurgerIngredient from "../burgerIngredient/BurgerIngredient"
import { ingredientsArrPropType } from "../../utils/prop-types";

function BurgerIngredients() {

    const bun = [];
    const sauce = [];
    const main = [];
    
    data.forEach((item) => {
        if(item.type === 'bun')
            bun.push(<BurgerIngredient item={item} key={item._id}/>)
        else if(item.type === 'sauce')
            sauce.push(<BurgerIngredient item={item} key={item._id}/>)
        else if(item.type === 'main')
            main.push(<BurgerIngredient item={item} key={item._id}/>)
        else
            console.log(`Какая-то новая категория - ${item.type}`)
    })
    
    return (
        <>
            <div className={`${styles.items} custom-scroll custom-scroll-margin`} >
                <h2 className="text text_type_main-medium">Булки</h2>
                <div className={styles.items__ingredients}>{bun}</div>
                <h2 className="text text_type_main-medium">Соусы</h2>
                <div className={styles.items__ingredients}>{sauce}</div>
                <h2 className="text text_type_main-medium">Начинки</h2>
                <div className={styles.items__ingredients}>{main}</div>                
            </div>
        </>
    )
}

BurgerIngredients.propTypes = {
    data: ingredientsArrPropType.isRequired
}

export default BurgerIngredients;