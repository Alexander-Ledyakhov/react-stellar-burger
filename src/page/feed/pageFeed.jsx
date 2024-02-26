import styles from './pageFeed.module.css';
import OrderCard from '../../components/OrderCard/OrderCard'
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/ws";
import { v4 as key } from 'uuid';
import Modal from '../../components/Modal/Modal'
import {FeedDetails} from '../../components/FeedDetails/FeedDetails'
import { useLocation } from 'react-router-dom';


import { useState } from "react";




export const FeedPage = ({onClose}) => {

  const {pathname} = useLocation()
  const { visible } = useSelector(state => state.modalReducer);
  const dispatch = useDispatch()



  const [readyOrders, setReadyOrders] = useState(null)
  const [pendingOrders, setPendingOrders] = useState(null)

  const ordersWS = useSelector(store => store.wsReducer.messages.orders)
  const totalWS = useSelector(store => store.wsReducer.messages.total)
  const totalTodayWS = useSelector(store => store.wsReducer.messages.totalToday)

  const total = useMemo(() => {
    if (typeof totalWS == 'number') {
      const totalArr = String(totalWS).split("")
      const strWithSpaces = totalArr.reduceRight((accumulator, currentValue, currentIndex) => {
        const spaceOrNothing = ((((totalArr.length - currentIndex) % 3) === 0) ? ' ' : '');
        return (spaceOrNothing + currentValue + accumulator);
      }, '');
      return strWithSpaces
    }
  }, [totalWS])

  const totalToday = useMemo(() => {
    return totalTodayWS
  }, [totalTodayWS])

  const orders = useMemo(() => {
    const orders = []
    if (ordersWS) {
      for (let orderWS of ordersWS) {
        orders.push(<OrderCard order={orderWS} key={orderWS._id} link={pathname} />)
      }
    }
    return orders
  }, [ordersWS])

  const getDoneOrders = useMemo(() => {
    const doneOrdersArr = []
    if (readyOrders) {
      readyOrders.forEach(readyOrder => {
        doneOrdersArr.push(<p key={key()} className={`${styles.summary_done} mt-2 mr-2 text text_type_digits-default`}>{readyOrder}</p>)
      });
    }
    return doneOrdersArr
  }, [readyOrders])
  
  const getPendingOrders = useMemo(() => {
    const pendingOrdersArr = []
    if (pendingOrders) {
      pendingOrders.forEach(pendingOrder => {
        pendingOrdersArr.push(<p key={key()} className='mt-2 mr-2 text text_type_digits-default'>{pendingOrder}</p>)
      });
    }
    return pendingOrdersArr
  }, [pendingOrders])

  const list = (status, lengthMin, lengthMax) => {
    if (status) {
      return (
        <div className={`mr-1 mb-2`}>
          {status.slice(lengthMin, lengthMax)}
        </div>
      )
    }
  }

  const summaryStatus = (ids) => {
    if (ids.length <= 10) {
      return (
          <div className={styles.summary_list}>
            {list(0, 10)}
          </div>
        )
    } else if (ids.length <= 20) {
      return (
        <div className={styles.summary_list}>
          {list(ids, 0, 10)}
          {list(ids, 10, 20)}
        </div>
      )
    } else if (ids.length <= 30) {
      return (
        <div className={styles.summary_list}>
          {list(ids, 0, 10)}
          {list(ids, 10, 20)}
          {list(ids, 20, 30)}
        </div>
      )
    } else if (ids.length <= 40) {
      return (
        <div className={`custom-scroll ${styles.summary_list}`}>
          {list(ids, 0, 10)}
          {list(ids, 10, 20)}
          {list(ids, 20, 30)}
          {list(ids, 30, 40)}
        </div>
      )
    } else if (ids.length > 40) {
      return (
        <div className={`custom-scroll ${styles.summary_list}`}>
          {list(ids, 0, 10)}
          {list(ids, 10, 20)}
          {list(ids, 20, 30)}
          {list(ids, 30, 40)}
          {list(ids, 40,)}
        </div>
      )
    }
  }

  const getOrders = (orders, statusName) => {
    return orders.filter((item) => item.status === statusName).map((item) => item.number)
  };

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch])

  useEffect(() => {
    if (ordersWS) {
      setReadyOrders(getOrders(ordersWS, 'done'))
      setPendingOrders(getOrders(ordersWS, 'pending'))
    }
  }, [ordersWS])


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
                {summaryStatus(getDoneOrders)}
              </div>
              <div className={styles.summary_status}>
                <h2 className="mb-4 text text_type_main-medium">В работе:</h2>
                {summaryStatus(getPendingOrders)}
              </div>
            </div>
            <div className='mb-15'>
                <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                <p className="text text_type_digits-large">{total}</p>
            </div>
            <div>
                <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
          </section>
        </>
      }
    </main>
  )
}