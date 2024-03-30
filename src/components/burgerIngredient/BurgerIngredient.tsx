import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredient.module.css"
import { useDrag } from "react-dnd";
import { FC, useMemo } from "react";
import { MODAL_OPEN } from '../../services/actions/modal';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../types/typesReact";
import { TBurgerIngredient } from "../../types/functionComponentType";

const BurgerIngredient: FC<TBurgerIngredient> = ({itemContent}) => {

    const location = useLocation();
    const { ingredients, bun } = useAppSelector(state => state.constructorIngredientsReducer);

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

    const dispatch = useAppDispatch();

    const openModalItem = () => {
        const type = 'ingredient'
        const title = 'Детали ингредиента'
        
        dispatch({
            type: MODAL_OPEN,
            payload: { type, title }
        })
    }

    return (
        <Link to={`/ingredients/${itemContent._id}`} className={styles.ingredient__link} onClick={openModalItem} state={{ pathname: location }}>
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

export default BurgerIngredient;