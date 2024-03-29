import styles from './profileOrders.module.css';
import OrderCard from '../../components/OrderCard/OrderCard'
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START_USER } from "../../services/actions/ws";
import { useLocation } from 'react-router-dom';

function ProfileOrders() {
  
  const {pathname} = useLocation()
  const dispatch = useDispatch()
  const profileOrders = useSelector(store => store.wsReducer.messages.orders)

  const orders = useMemo(() => {
    const orders = []
    if (profileOrders) {
      for (let orderWS of profileOrders) {
        orders.push(<OrderCard order={orderWS} key={orderWS._id} link={pathname}/>)
      }
    }
    return orders
  }, [profileOrders])

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_USER });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch])

  return (
      <section className={`${styles.profileOrders} custom-scroll custom-scroll-margin`} >
        {orders}
      </section>
  )
}

export default ProfileOrders