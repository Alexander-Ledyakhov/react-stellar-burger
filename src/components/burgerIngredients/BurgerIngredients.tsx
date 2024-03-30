import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../burgerIngredient/BurgerIngredient"
import { useAppSelector } from "../../types/typesReact";
import { TIngredient } from "../../types/typesApi";
import { ReactElement } from "react";

function BurgerIngredients() {

    const ingredients = useAppSelector(state => state.ingredientsReducer.allIngredients); 
    
    const bun: ReactElement<TIngredient, string>[] = []
    const sauce: ReactElement<TIngredient, string>[] = []
    const main: ReactElement<TIngredient, string>[] = []

    ingredients.forEach((item: TIngredient) => {
        if(item.type === 'bun')
            bun.push(<BurgerIngredient itemContent={item} key={item._id} />)
        else if(item.type === 'sauce')
            sauce.push(<BurgerIngredient itemContent={item} key={item._id} />)
        else if(item.type === 'main')
            main.push(<BurgerIngredient itemContent={item} key={item._id} />)
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