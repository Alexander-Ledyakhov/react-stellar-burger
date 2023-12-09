import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientObjectPropType } from "../../utils/prop-types";
import styles from "./burgerIngredient.module.css"
import PropTypes from "prop-types";


function BurgerIngredient(props) {
    return (
        <div className={styles.ingredient}  
            onClick={(evt) => {
               props.setOpen(true);
               const itemId = evt.currentTarget.getAttribute('id');
               (props.data._id === itemId) && props.modal('ingredient', props.data, 'Детали ингредиента');
            }} 
            id={props.data._id} 
        > 
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={props.data.image} alt={`картинка ${props.data.name}`} />
            <div className={`${styles.ingredient__price} mt-2 mb-2`} >
                <p className='text text_type_digits-default'>{props.data.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${styles.ingredient__name} text text_type_main-default`}>
                {props.data.name}
            </p>
        </div>
    )
}

BurgerIngredient.propTypes = {
    data: ingredientObjectPropType.isRequired,
    setOpen: PropTypes.func.isRequired,
    modal: PropTypes.func.isRequired
}

export default BurgerIngredient;