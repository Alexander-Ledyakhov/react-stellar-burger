import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsArrPropType } from "../../utils/prop-types";
import styles from "./burgerIngredient.module.css"

function BurgerIngredient(props) {
    return (
        <div className={styles.ingredient} > 
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={props.item.image} alt={`картинка ${props.item.name}`} />
            <div className={`${styles.ingredient__price} mt-2 mb-2`} >
                <p className='text text_type_digits-default'>{props.item.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${styles.ingredient__name} text text_type_main-default`} >
                {props.item.name}
            </p>
        </div>
    );
}

BurgerIngredient.propTypes = {
    data: ingredientsArrPropType.isRequired
}

export default BurgerIngredient;