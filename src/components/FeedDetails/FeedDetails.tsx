import styles from "./feedDetails.module.css"
import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_START_USER } from "../../services/actions/ws";
import { getOrderApi } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../types/typesReact";
import { TCurrentOrder, TIngredient } from "../../types/typesApi";
import { FeedIngredientDetails } from "./FeedIngredientDetails";
import { urlOrders } from "../../utils/data";

export function FeedDetails() {
    const {pathname} = useLocation()
    const path = pathname.split("/")[1]
    const { visible } = useAppSelector(state => state.modalReducer);
    const dispatch = useAppDispatch()    
    const ordersWS = useAppSelector(store => store.wsReducer.orders)
    if (ordersWS) {
        console.log(ordersWS);
      }



    const [order, setOrder] = useState<TCurrentOrder>()
    const [orderApi, setOrderApi] = useState<TCurrentOrder>()
    const { numberId } = useParams<string>();
    
    const items = useAppSelector(state => state.ingredientsReducer.allIngredients);
    const [ingredientsIds, setIngredientsIds] = useState<string[]>()

    const ingredientsItems = useMemo(() => {
        if (!ingredientsIds) return;
        if (!items) return;
        return ingredientsIds.map((ingredientID) => {
            return items.find(item => item._id === ingredientID) as TIngredient;
        })
    }, [ingredientsIds, items])

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
        const ingredientsArr = [] as string[]
        if (ingredientsItems) {
            ingredientsItems.forEach((ingredientItem: TIngredient) => {
                ingredientsArr.push(ingredientItem._id)
            });
        }
        let result = {} as any;
        if (ingredientsArr) {
            ingredientsArr.forEach((ingredient: string) => {
                if (result[ingredient] !== undefined)
                    ++result[ingredient];
                else
                    result[ingredient] = 1;
            });
        }
        return result
    }, [ingredientsItems])

    const ingredientsUniqueArr = useMemo(() => {
        if (ingredientsObj) {
            const ingredientsUniqueArr = [] as string[]
            for(let i in ingredientsObj) {
                ingredientsUniqueArr.push(i)
            }
            return ingredientsUniqueArr
        }
    }, [ingredientsObj])

    const ingredientsUniqueItems = useMemo(() => {
        if(ingredientsUniqueArr?.length === 0) {
            const ingredientsUniqueItems = [{
                _id: '',
                name: '',
                type: '',
                proteins: 0,
                fat: 0,
                carbohydrates: 0,
                calories: 0,
                price: 0,
                image: '',
                image_mobile: '',
                image_large: '',
                __v: 0,
            }]
            return ingredientsUniqueItems;
        }
        if (ingredientsUniqueArr) {
            const ingredientsUniqueItems = ingredientsUniqueArr.map((ingredientID) => {
                return items.find(item => item._id === ingredientID) as TIngredient;
            })
            return ingredientsUniqueItems
        }
    }, [ingredientsUniqueArr, items]) as TIngredient[];

    useEffect(() => {
        if (path === 'feed' && !visible) {
            dispatch({
                type: WS_CONNECTION_START,
                payload: `${urlOrders}/all`
            });
            return () => {
                dispatch({ type: WS_CONNECTION_CLOSED });
            }
        } else if (path === 'profile' && !visible) {
            const accessToken = localStorage.getItem('accessToken') as string
            dispatch({ 
                type: WS_CONNECTION_START_USER,
                payload: `${urlOrders}?token=${accessToken.slice(7)}`
            });
            return () => {
              dispatch({ type: WS_CONNECTION_CLOSED });
            }
        }
    }, [dispatch, path, visible])
    
    useEffect(() => {
        if (order) {
            setIngredientsIds(order.ingredients)
        }
    }, [order])

    useEffect(() => {
        if (ordersWS === undefined && numberId !== undefined) {
            getOrderApi(numberId).then((json) => {
                if (json.success) {
                    setOrderApi(json.orders);
                }
            })
            if (orderApi && typeof orderApi == 'object') {
                setOrder(orderApi)
            }
        }
    }, [ordersWS, numberId, orderApi])

    useEffect(() => {
        if (!numberId || !ordersWS) return;
        setOrder(ordersWS.find(orderWS => orderWS._id === numberId))
    }, [ordersWS, numberId])

    return (
        <>
        {(order) &&
            <div className={`${!visible && styles.feedDetails__notModal} ${styles.feedDetails}`}>
                <p className={`text text_type_digits-default mb-10 ${styles.feedDetails_number}`}>#{order.number}</p>
                <p className="text text_type_main-medium mb-3">{order.name}</p>
                <p className={`text text_type_main-default mb-15 ${styles.feedDetails_color}`}>
                    {(order.status === 'done') && 'Выполнен'}
                    {(order.status === 'pending') && 'Готовится'}
                    {(order.status === 'created') && 'Создан'}
                </p>
                <p className="text text_type_main-medium">Состав:</p>
                <FeedIngredientDetails ingredientsItems={ingredientsUniqueItems} ingredientsObj={ingredientsObj}/>
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
