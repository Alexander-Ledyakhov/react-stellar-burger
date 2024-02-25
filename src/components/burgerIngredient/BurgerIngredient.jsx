import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientObjectPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "./burgerIngredient.module.css"
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { useDispatch } from 'react-redux';
import { MODAL_OPEN } from '../../services/actions/modal';
import { Link } from 'react-router-dom';

function BurgerIngredient({itemContent}) {

    const { ingredients, bun } = useSelector(state => state.constructorIngredientsReducer);
    
    const [, dragRef] = useDrag({
        type: 'itemData',
        item: {itemContent}
    });


    const getCount = useMemo(() => {
        const countIngredients = ingredients.filter(
                (item) => item.item._id === itemContent._id,
            )

        let countBun = 0
        if (bun) {
            if (bun.item._id === itemContent._id) {
                countBun = 2
                return countBun
            }
        }

        return countIngredients.length + countBun;
    }, [ingredients, bun, itemContent]);


    const dispatch = useDispatch();


    const openModalItem = () => {
        const type = 'ingredient'
        const title = 'Детали ингредиента'
        
        dispatch({
            type: MODAL_OPEN,
            payload: { type, title }
        })
    }



    return (
        <Link to={`/ingredients/${itemContent._id}`} className={styles.ingredient__link} onClick={openModalItem}>
            <div className={styles.ingredient} draggable ref={dragRef}> 
                <Counter count={getCount} size="default" extraClass="m-1" />
                <img src={itemContent.image} alt={`картинка ${itemContent.name}`} />
                <div className={`${styles.ingredient__price} mt-2 mb-2`} >
                    <p className='text text_type_digits-default'>{itemContent.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`${styles.ingredient__name} text text_type_main-default`}>
                    {itemContent.name}
                </p>
            </div>
        </Link>
    )
}

BurgerIngredient.propTypes = {
    itemContent: PropTypes.shape(ingredientObjectPropType.isRequired).isRequired
}

export default BurgerIngredient;