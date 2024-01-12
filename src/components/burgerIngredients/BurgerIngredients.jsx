import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../burgerIngredient/BurgerIngredient"
import { useSelector } from 'react-redux';

function BurgerIngredients() {

    const ingredients = useSelector(state => state.ingredientsReducer.allIngredients); 
    
    const cattegories = {
        'bun': [],
        'sauce': [],
        'main': []
    }

    ingredients.forEach((item) => {
        cattegories[item.type].push(<BurgerIngredient itemContent={item} key={item._id} />)
    })
    
    return (
        <>
            <div className={`${styles.items} custom-scroll custom-scroll-margin`} id="menu">

                <div id="categoryMenu">
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <div className={styles.items__ingredients}>{cattegories.bun}</div>
                </div>

                <div id="categoryMenu">
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <div className={styles.items__ingredients}>{cattegories.sauce}</div>
                </div>

                <div id="categoryMenu">
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <div className={`${styles.items__ingredients} ${styles.items__ingredientsLast}`}>{cattegories.main}</div>  
                </div>              
            </div>
        </>
    )
}

export default BurgerIngredients;