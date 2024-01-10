import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientObjectPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "./burgerIngredient.module.css"
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { useDispatch } from 'react-redux';
import { MODAL_OPEN } from '../../services/actions/modal';





function BurgerIngredient({data}) {

    const { ingredients, bun } = useSelector(state => state.constructorIngredientsReducer);
    
    const [, dragRef] = useDrag({
        type: 'itemData',
        item: {data}
    });


    const count = useMemo(() => {
        const countIngredients = ingredients.filter(
                (item) => item.item._id === data._id,
            )

        let countBun = 0
        if (bun) {
            if (bun.item._id === data._id) {
                countBun = 2
                return countBun
            }
        }

        return countIngredients.length + countBun;
    }, [ingredients, bun, data]);


    const dispatch = useDispatch();


    const openModal = (type, title, info) => {
        dispatch({
            type: MODAL_OPEN,
            payload: { type, title, info },
        })
      }

    return (
        <div className={styles.ingredient}  
            onClick={(evt) => {
               const itemId = evt.currentTarget.getAttribute('id');
               (data._id === itemId) && openModal('ingredient', 'Детали ингредиента', data);
            }} 
            id={data._id} 
            draggable
            ref={dragRef}
        > 
            <Counter count={count} size="default" extraClass="m-1" />
            <img src={data.image} alt={`картинка ${data.name}`} />
            <div className={`${styles.ingredient__price} mt-2 mb-2`} >
                <p className='text text_type_digits-default'>{data.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${styles.ingredient__name} text text_type_main-default`}>
                {data.name}
            </p>
        </div>
    )
}

BurgerIngredient.propTypes = {
    data: PropTypes.shape(ingredientObjectPropType.isRequired).isRequired
}

export default BurgerIngredient;