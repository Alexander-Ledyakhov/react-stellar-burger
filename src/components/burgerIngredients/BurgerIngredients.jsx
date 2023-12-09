import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../burgerIngredient/BurgerIngredient"
import { ingredientsArrPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

function BurgerIngredients(props) {
    
    const bun = [];
    const sauce = [];
    const main = [];

    props.data.forEach((item) => {
        if(item.type === 'bun')
            bun.push(<BurgerIngredient data={item} key={item._id} setOpen={props.setOpen} modal={props.modal} />)
        else if(item.type === 'sauce')
            sauce.push(<BurgerIngredient data={item} key={item._id} setOpen={props.setOpen} modal={props.modal} />)
        else if(item.type === 'main')
            main.push(<BurgerIngredient data={item} key={item._id} setOpen={props.setOpen} modal={props.modal} />)
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
    data: ingredientsArrPropType.isRequired,
    setOpen: PropTypes.func.isRequired,
    modal: PropTypes.func.isRequired
}

export default BurgerIngredients;