import styles from './orderCard.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IconIngredients from '../IconIngredients/IconIngredients'
import { FC, useMemo } from 'react';
import { MODAL_OPEN } from '../../services/actions/modal';
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../types/typesReact';
import { TIngredient } from '../../types/typesApi';
import { TOrderCard } from '../../types/functionComponentType';

const OrderCard: FC<TOrderCard> = ({order, link}) => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const ingredientsID = order.ingredients
    const items = useAppSelector(state => state.ingredientsReducer.allIngredients);

    const ingredientsItems = ingredientsID.map((ingredientID) => {
        return items.find((item: {_id: string}) => item._id === ingredientID) as TIngredient;
    });

    const prise = useMemo(() => {
        let sum = 0
        if (ingredientsItems) {
            ingredientsItems.forEach(ingredientItem => {
                sum += ingredientItem.price
            });
        }
        return sum
    }, [ingredientsItems])

    const openModal = () => {
        const type = ''
        const title = ''
        
        dispatch({
            type: MODAL_OPEN,
            payload: { type, title }
        })
    }

    const display = (link === '/profile/orders') ? 'block' : 'none';
    const color = (order.status === 'done') ? '#00CCCC' : '#F2F2F3';

    return (
        <Link
            className={styles.order_link} 
            to={`${link}/${order._id}`}
            state={{ pathname: location }}
            onClick={openModal}
        >
            <div className={`${styles.order} ml-2 mr-2 mb-4`} >
                <div className='pt-6 pb-6 pl-6 pr-6'>
                    <div className={`${styles.order_id}`} >
                      <p className='text text_type_digits-default'>{order.number}</p>
                      <p className='text text_type_main-default text_color_inactive'><FormattedDate date={new Date(order.createdAt)} /> i-GMT+3</p>
                    </div>
                    <h3 className='text text_type_main-medium mt-6'>{order.name}</h3>
                    <p className='text text_type_main-default mt-2' style={{ display, color }}>
                        {(order.status === 'done') && 'Выполнен'}
                        {(order.status === 'pending') && 'Готовится'}
                        {( (order.status === '') || (order.status === 'created') || ((order.status !== 'done') && (order.status !== 'pending'))) && 'Создан'}
                    </p>
                    <div className={`${styles.order_components} mt-6`}>
                        <div className={styles.order_ingredients}>
                            {
                                ingredientsItems.slice(0, 6).map((IconIngredient, index: number) => (
                                    <IconIngredients ingredients={IconIngredient} key={IconIngredient._id+index} index={index} allIndex={ingredientsItems.length}/>
                                ))
                            }
                        </div>
                        <div className={styles.order_price} >
                            <p className="text text_type_digits-default mr-2">{prise}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderCard