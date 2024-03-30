import styles from "./burgerConstructor.module.css"
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import {BurgerConstructorIngredients} from '../BurgerConstructorIngredients/BurgerConstructorIngredients'
import { useDrop } from "react-dnd";
import { ADD_BUN, ADD_INGREDIENT } from '../../services/actions/constructorIngredients';
import { v4 as key } from 'uuid';
import { useMemo } from "react";
import { MODAL_OPEN } from '../../services/actions/modal';
import { postOrderDetails } from "../../services/actions/orderDetails";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../types/typesReact";
import { TIngredient } from "../../types/typesApi";


function BurgerConstructor() {
 
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { ingredients, bun, empty } = useAppSelector(state => state.constructorIngredientsReducer);
    const [, dropTarget] = useDrop({
        accept: "itemData",
        drop(ingredient: {itemContent: TIngredient}) {
            onDropHandler(ingredient);
        }
    });

    function onDropHandler(ingredient: {itemContent: TIngredient}) {
        const item = ingredient.itemContent;
        if (item.type === 'bun') dispatch({ type: ADD_BUN, payload: {item, key: key()} });
            else dispatch({ type: ADD_INGREDIENT, payload: {item, key: key()} });
    }    

    const price = useMemo(() => {
        const itemPrice = ingredients ? ingredients.reduce((sum, ingredient) => {
            return sum = sum + ingredient.item.price
        }, 0) : 0
        const bunPrice = bun ? (bun.item.price * 2) : 0;
        return itemPrice + bunPrice;
    }, [ingredients, bun]);

    const openModal = (type: string, title?: string) => {
        dispatch({
            type: MODAL_OPEN,
            payload: { type, title },
        })
    }

    const submitOrder = () => {
        if (!localStorage.getItem('refreshToken')) {
            localStorage.setItem('path', '/')
            navigate('/login', {replace: true})
        }

        if (!localStorage.getItem('accessToken')) return;
        if (getingredientsID().length > 0) {
            openModal('order')
            dispatch(postOrderDetails(getingredientsID(), localStorage.getItem('accessToken')!))
        } else {
            openModal('error', 'Корзина пуста')
        }
    };

    function getingredientsID(){
        const ingredientsID = ingredients.map((ingredient) => ingredient.item._id);
        if (bun) {
            ingredientsID.push(bun.item._id) 
            ingredientsID.unshift(bun.item._id) 
        }
        return ingredientsID
    }


    return (
        <section className={`${styles.constructor} mt-20 ml-10`} >
            <ul 
                className={`${styles.constructor__items_main} pl-4`}  
                ref={dropTarget}>
                    {
                        empty &&
                        <li className={styles.constructor__empty}>
                            <p className="text text_type_main-default text_color_inactive">
                                Перетащи сюда ингредиенты
                            </p>
                        </li>
                    }
                    {
                        bun && <li className='ml-8'>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.item.name} (верх)`}
                                price={bun.item.price}
                                thumbnail={bun.item.image}/>
                        </li>
                    }
                    {ingredients &&
                        <ul 
                            className={`${styles.constructor__items} custom-scroll`} 
                            id="constructorItems">
                                {ingredients.map((ingredient, index) => (
                                    <BurgerConstructorIngredients 
                                        key={ingredient.key} 
                                        index={index} 
                                        ingredient={ingredient}/>
                                ))}
                        </ul>
                    }
                    {
                        bun && <li className={"ml-8"}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.item.name} (низ)`}
                                price={bun.item.price}
                                thumbnail={bun.item.image}/>
                        </li>
                    }
            </ul>
            
            <div className={`${styles.constructor__summarizing} mt-10 mr-4`} >
                <div className={`${styles.constructor__price} mr-10`} >
                    <p className="text text_type_digits-medium mr-2">
                        {price}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>

                <Button 
                    htmlType="button"
                    type="primary" 
                    size="large"
                    onClick={() => submitOrder()}
                >
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
}

export default BurgerConstructor;