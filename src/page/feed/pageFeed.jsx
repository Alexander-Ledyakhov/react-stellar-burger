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
  useEffect(() => {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
          dispatch({ type: WS_CONNECTION_CLOSED });
      }
  }, [dispatch, visible])

  const ordersWS = useSelector(store => store.wsReducer.messages.orders)
  const totalWS = useSelector(store => store.wsReducer.messages.total)
  const totalTodayWS = useSelector(store => store.wsReducer.messages.totalToday)

  const total = useMemo(() => {
    const total = totalWS
    if (typeof total == 'number') {
      const totalArr = String(total).split("")
      const strWithSpaces = totalArr.reduceRight((accumulator, currentValue, currentIndex) => {
        const spaceOrNothing = ((((totalArr.length - currentIndex) % 3) === 0) ? ' ' : '');
        return (spaceOrNothing + currentValue + accumulator);
      }, '');
      return strWithSpaces
    }
  }, [totalWS])

  const totalToday = useMemo(() => {
    const totalToday = totalTodayWS
    return totalToday
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

  const done = useMemo(() => {
    const done = []
    if (ordersWS) {
      for (let orderWS of ordersWS) {
        if (orderWS.status == 'done') {
          done.push(<p key={key()} className={`${styles.summary_done} mt-2 mr-2 text text_type_digits-default`}>{orderWS.number}</p>)
        }
      }
    }
    return done
  }, [ordersWS])

  const pending = useMemo(() => {
    const pending = []
    if (ordersWS) {
      for (let orderWS of ordersWS) {
        if (orderWS.status == 'pending') {
          pending.push(<p key={key()} className='mt-2 mr-2 text text_type_digits-default'>{orderWS.number}</p>)
        }
      }
    }
    return pending
  }, [ordersWS])

  const list = (status, lengthMin, lengthMax) => {
    if (status) {
      return (
        <div className={`mr-2 mb-2`}>
          {status.slice(lengthMin, lengthMax)}
        </div>
      )
    }
  }

  const summaryStatus = (status) => {
    if (status.length <= 10) {
      return list(0, 10)
    } else if (status.length <= 20) {
      return (
        <>
          {list(status, 0, 10)}
          {list(status, 10, 20)}
        </>
      )
    } else if (status.length <= 30) {
      return (
        <>
          {list(status, 0, 10)}
          {list(status, 10, 20)}
          {list(status, 20, 30)}
        </>
      )
    } else if (status.length <= 40) {
      return (
        <>
          {list(status, 0, 10)}
          {list(status, 10, 20)}
          {list(status, 20, 30)}
          {list(status, 30, 40)}
        </>
      )
    } else if (status.length > 40) {
      return (
        <>
          {list(status, 0, 10)}
          {list(status, 10, 20)}
          {list(status, 20, 30)}
          {list(status, 30, 40)}
          {list(status, 40,)}
        </>
      )
    }
  }

  return (
    <main className={styles.main}>

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
            <div className={styles.summary_list}>
              {summaryStatus(done)}
            </div>
          </div>
          <div className={styles.summary_status}>
            <h2 className="mb-4 text text_type_main-medium">В работе:</h2>
            <div className={styles.summary_list}>
              {summaryStatus(pending)}
            </div>
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
    </main>
  )
}