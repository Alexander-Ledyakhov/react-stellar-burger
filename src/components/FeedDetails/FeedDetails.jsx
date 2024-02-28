import styles from "./feedDetails.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as key } from 'uuid';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_START_USER } from "../../services/actions/ws";
import IconFeed from '../IconFeed/IconFeed'
import { getOrderApi } from "../../utils/api";

export function FeedDetails() {
    const {pathname} = useLocation()
    const path = pathname.split("/")[1]
    const { visible } = useSelector(state => state.modalReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        if (path == 'feed' && !visible) {
            dispatch({ type: WS_CONNECTION_START });
            return () => {
                dispatch({ type: WS_CONNECTION_CLOSED });
            }
        } else if (path == 'profile' && !visible) {
            dispatch({ type: WS_CONNECTION_START_USER });
            return () => {
              dispatch({ type: WS_CONNECTION_CLOSED });
            }
        }
    }, [dispatch])
    
    const ordersWS = useSelector(store => store.wsReducer.messages.orders)
    const [order, setOrder] = useState(null)
    const [orderApi, setOrderApi] = useState(null)
    const { numberId } = useParams();
    
    const items = useSelector(state => state.ingredientsReducer.allIngredients);
    const [ingredientsIds, setIngredientsIds] = useState(null)

    useEffect(() => {
        if (order) {
            setIngredientsIds(order.ingredients)
        }
    }, [order])

    useEffect(() => {
        if (ordersWS && (numberId in ordersWS)) {
            getOrderApi(numberId).then((json) => {
                console.log(json)
                if (json.success) {
                    setOrderApi(json.orders);
                }
            })
            if (orderApi && typeof orderApi == 'object') {
                setOrder(orderApi)
            }
        }
    }, [ordersWS, numberId])

    useEffect(() => {
        if (!numberId || !ordersWS) return;
        setOrder(ordersWS.find(orderWS => orderWS._id === numberId))
    }, [ordersWS, numberId])

    const ingredientsItems = useMemo(() => {
        if (ingredientsIds) {
            return ingredientsIds.map((ingredientID) => {
                return items.find(item => item._id === ingredientID);
            })
        }
    }, [ingredientsIds])

    const prise = useMemo(() => {
        let sum = 0
        if (ingredientsItems) {
            ingredientsItems.forEach(ingredientItem => {
                sum += ingredientItem.price
            });
        }
        return sum
    }, [ingredientsItems])

    const ingredientsObj = useMemo(() => {
        const ingredientsArr = []
        if (ingredientsItems) {
            ingredientsItems.forEach(ingredientItem => {
                ingredientsArr.push(ingredientItem._id)
            });
        }
        let result = {};

        if (ingredientsArr) {
            ingredientsArr.forEach((ingredient) => {
                if (result[ingredient] != undefined)
                    ++result[ingredient];
                else
                    result[ingredient] = 1;
            });
        }
        return result
    }, [ingredientsItems])

    const ingredientsUniqueArr = useMemo(() => {
        if (ingredientsObj) {
            const ingredientsUniqueArr = []
            for(let i in ingredientsObj) {
                ingredientsUniqueArr.push(i)
            }
            return ingredientsUniqueArr
        }
    }, [ingredientsObj])

    const ingredientsUniqueItems = useMemo(() => {
        if (ingredientsUniqueArr) {
            const ingredientsUniqueItems = ingredientsUniqueArr.map((ingredientID) => {
                return items.find(item => item._id === ingredientID);
            })
            return ingredientsUniqueItems
        }
    }, [ingredientsUniqueArr])

    const marginRight = ingredientsUniqueArr.length > 4 ? '24px' : '0px';

    return (
        <>
        {(order) &&
            <div className={`${!visible && styles.feedDetails__notModal} ${styles.feedDetails}`}>
                <p className={`text text_type_digits-default mb-10 ${styles.feedDetails_number}`}>#{order.number}</p>
                <p className="text text_type_main-medium mb-3">{order.name}</p>
                <p className={`text text_type_main-default mb-15 ${styles.feedDetails_color}`}>
                    {(order.status == 'done') && 'Выполнен'}
                    {(order.status == 'pending') && 'Готовится'}
                    {(order.status == 'created') && 'Создан'}
                </p>
                <p className="text text_type_main-medium">Состав:</p>

                {ingredientsUniqueItems &&
                        <ul 
                            className={`mt-6 ${styles.feedDetails__ingredients} custom-scroll`} 
                        >
                                {ingredientsUniqueItems.map((ingredient) => (
                                    <li  style={{ marginRight }} key={key()} className={`${styles.feedDetails__ingredient}`} >
                                        <div className={styles.feedDetails_description}>
                                            <IconFeed image={ingredient.image} name={ingredient.name} key={key()}/>
                                            <p className="ml-4 text text_type_main-default">{ingredient.name}</p>
                                        </div>
                                        <div className={styles.feedDetails_description}>
                                            <p className="mr-2 text text_type_digits-default">{(ingredientsObj) && ingredientsObj[ingredient._id]} x {ingredient.price}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </li>
                                ))}
                        </ul>
                }

                <div className={`mt-10 ${styles.feedDetails_footer}`}>
                    <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(order.updatedAt)} /> i-GMT+3</p>
                    <div className={`${styles.feedDetails_price}`}>
                        <p className={`text text_type_digits-default mr-2`}>{prise}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        }
        </>
    );
}
