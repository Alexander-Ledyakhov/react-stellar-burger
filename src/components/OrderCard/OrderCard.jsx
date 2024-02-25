import styles from './orderCard.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IconIngredients from '../IconIngredients/IconIngredients'
import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { MODAL_OPEN } from '../../services/actions/modal';
import { v4 as key } from 'uuid';
import { Link, useLocation } from "react-router-dom";

const OrderCard = ({order, link}) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const ingredientsID = order.ingredients
    const items = useSelector(state => state.ingredientsReducer.allIngredients);

    const ingredientsItems = ingredientsID.map((ingredientID) => {
        return items.find(item => item._id === ingredientID);
    });

    const prise = useMemo(() => {
        let sum = 0
        ingredientsItems.forEach(ingredientItem => {
            sum += ingredientItem.price
        });
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

    const display = (link == '/profile/orders') ? 'block' : 'none';
    const color = (order.status == 'done') ? '#00CCCC' : '#F2F2F3';

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
                        {(order.status == 'done') && 'Выполнен'}
                        {(order.status == 'pending') && 'Готовится'}
                        {(order.status == 'created') && 'Создан'}
                    </p>
                    <div className={`${styles.order_components} mt-6`}>
                        <div className={styles.order_ingredients}>
                            {
                                ingredientsItems.slice(0, 6).map((IconIngredient, index) => (
                                    <IconIngredients ingredients={IconIngredient} key={key()} index={index} allIndex={ingredientsItems.length}/>
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