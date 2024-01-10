import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../burgerIngredient/BurgerIngredient"
import { useSelector } from 'react-redux';

function BurgerIngredients() {

    const ingredients = useSelector(state => state.ingredientsReducer.allIngredients); 
    
    const bun = [];
    const sauce = [];
    const main = [];

    ingredients.forEach((item) => {
        if(item.type === 'bun')
            bun.push(<BurgerIngredient data={item} key={item._id} />)
        else if(item.type === 'sauce')
            sauce.push(<BurgerIngredient data={item} key={item._id} />)
        else if(item.type === 'main')
            main.push(<BurgerIngredient data={item} key={item._id} />)
        else
            console.log(`Какая-то новая категория - ${item.type}`)
    })
    
    return (
        <>
            <div className={`${styles.items} custom-scroll custom-scroll-margin`} id="menu">

                <div id="categoryMenu">
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <div className={styles.items__ingredients}>{bun}</div>
                </div>

                <div id="categoryMenu">
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <div className={styles.items__ingredients}>{sauce}</div>
                </div>

                <div id="categoryMenu">
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <div className={`${styles.items__ingredients} ${styles.items__ingredientsLast}`}>{main}</div>  
                </div>              
            </div>
        </>
    )
}

export default BurgerIngredients;