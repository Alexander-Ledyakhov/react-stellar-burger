import styles from './profileOrders.module.css';
import OrderCard from '../../components/OrderCard/OrderCard'
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/ws";
import { useLocation } from 'react-router-dom';

function ProfileOrders() {
  
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

  const orders = useMemo(() => {
    const orders = []
    if (ordersWS) {
      for (let orderWS of ordersWS) {
        orders.push(<OrderCard order={orderWS} key={orderWS._id} link={pathname}/>)
      }
    }
    return orders
  }, [ordersWS])

  return (
      <section className={`${styles.profileOrders} custom-scroll custom-scroll-margin`} >
        {orders}
      </section>
  )
}

export default ProfileOrders