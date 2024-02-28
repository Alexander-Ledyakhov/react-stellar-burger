import styles from './pageFeed.module.css';
import OrderCard from '../../components/OrderCard/OrderCard'
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/ws";
import { v4 as key } from 'uuid';
import Modal from '../../components/Modal/Modal'
import {FeedDetails} from '../../components/FeedDetails/FeedDetails'
import { useLocation } from 'react-router-dom';

export const FeedPage = ({onClose}) => {

  const {pathname} = useLocation()
  const { visible } = useSelector(state => state.modalReducer);
  const dispatch = useDispatch()

  const ordersWS = useSelector(store => store.wsReducer.messages.orders)
  const totalWS = useSelector(store => store.wsReducer.messages.total)
  const totalTodayWS = useSelector(store => store.wsReducer.messages.totalToday)
  
  const getOrders = (orders, statusName) => {
    return orders.filter((item) => item.status === statusName).map((item) => item.number)
  };
  const readyOrders = useMemo(() => ordersWS && getOrders(ordersWS, "done"), [ordersWS])
  const pendingOrders = useMemo(() => ordersWS && getOrders(ordersWS, "pending"), [ordersWS])

  const addingSpaceNumbers = (num) => {
    const totalArr = String(num).split("")
    const strWithSpaces = totalArr.reduceRight((accumulator, currentValue, currentIndex) => {
        const spaceOrNothing = ((((totalArr.length - currentIndex) % 3) === 0) ? ' ' : '');
        return (spaceOrNothing + currentValue + accumulator);
      }, '');
    return strWithSpaces
  }

  const orders = useMemo(() => {
    const orders = []
    if (ordersWS) {
      for (let orderWS of ordersWS) {
        orders.push(<OrderCard order={orderWS} key={orderWS._id} link={pathname} />)
      }
    }
    return orders
  }, [ordersWS])

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch])

  return (
    <main className={styles.main}>

      {ordersWS && 
        <>
          { visible  && (
              <Modal onClose={onClose}>
                  <FeedDetails />
              </Modal>
          )}
          
          <h1 className={`text text_type_main-large pt-10 mb-5 ${styles.main_title}`}>Лента заказов</h1>
          
          <section className={`${styles.feed} custom-scroll custom-scroll-margin`} >
            {orders}
          </section>

          <section>
            <div className={`mb-15 ${styles.summary_statuses}`}>
              <div className={styles.summary_status}>
                <h2 className="mb-4 text text_type_main-medium">Готовы:</h2>
                <div className={`${styles.summary_readyOrder} ${styles.summary_list}`}>
                  {readyOrders && readyOrders.map((readyOrder) => (
                    <p key={key()} className={`mt-2 mr-2 text text_type_digits-default`}>{readyOrder}</p>
                  ))}
                </div>
              </div>
              <div className={styles.summary_status}>
                <h2 className="mb-4 text text_type_main-medium">В работе:</h2>
                <div className={styles.summary_list}>
                  {pendingOrders && pendingOrders.map((pendingOrder) => (
                    <p key={key()} className={`mt-2 mr-2 text text_type_digits-default`}>{pendingOrder}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className='mb-15'>
                <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                <p className="text text_type_digits-large">{addingSpaceNumbers(totalWS)}</p>
            </div>
            <div>
                <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                <p className="text text_type_digits-large">{addingSpaceNumbers(totalTodayWS)}</p>
            </div>
          </section>
        </>
      }
    </main>
  )
}