import style from './pageProfile.module.css'

import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { postLogoutAuth } from "../../services/actions/logout";
import { getInfoUser } from "../../services/actions/infoUser";
import { postTokenAuth } from "../../services/actions/token";

import Modal from '../../components/Modal/Modal'
import {FeedDetails} from '../../components/FeedDetails/FeedDetails'
import { useLocation } from 'react-router-dom';

function ProfilePage({ element, onClose }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { visible } = useSelector(state => state.modalReducer);
    const tokenSuccess = useSelector(state => state.tokenReducer.success)
    const tokenError = useSelector(state => state.tokenReducer.error)
    const logoutRequest = useSelector(state => state.logoutReducer.request);
    const {pathname} = useLocation()
    const classNav = (path) => {
      return (`${style.profile__link} text text_type_main-medium text_color_inactive ${pathname === path && style.profile__textColor}`)
    }

    useEffect(() => {
      if (tokenError == 'Ошибка: 401') {
        dispatch(postLogoutAuth(localStorage.getItem('refreshToken')))
      }
    }, [tokenError])

    useEffect(() => {
          if ((localStorage.getItem('accessToken')) && tokenSuccess) {
              dispatch(getInfoUser(localStorage.getItem('accessToken')))
          }
    }, [dispatch, tokenSuccess, localStorage.getItem('accessToken')])

    useEffect(() => {
      dispatch(postTokenAuth(localStorage.getItem('refreshToken')))
    }, [dispatch])


    const onExit = () => {
      dispatch(postLogoutAuth(localStorage.getItem('refreshToken')))
    };

    useEffect(() => {
      if (!localStorage.getItem('refreshToken')) {
        navigate('/', {replace: true})
      }
    }, [navigate, localStorage.getItem('refreshToken')])

    const textExit = useMemo(() => {
      return (logoutRequest) ? 'Выход..' : 'Выход'
    }, [logoutRequest]);
    
    return (
        <main className={style.profile}>

            { visible  && (
              <Modal onClose={onClose}>
                  <FeedDetails />
              </Modal>
            )}
            <div className={style.profile_nav}>
                <nav>
                    <li className={style.profile_li}>
                        <NavLink
                          to="/profile"
                          className={classNav("/profile")}
                        >
                          Профиль
                        </NavLink>
                    </li>
                    
                    <li className={style.profile_li}>
                        <NavLink
                          to="/profile/orders"
                          className={classNav("/profile/orders")}
                        >
                          История заказов
                        </NavLink>
                    </li>

                    <li className={style.profile_li}>
                        <NavLink
                          className={`${style.profile__link} text text_type_main-medium text_color_inactive`}
                          onClick={onExit}
                        >
                          {textExit}
                        </NavLink>
                    </li>
                </nav>
                <p className={`text text_type_main-default text_color_inactive mt-20 ${style.profile__text}`}>В этом разделе вы можете<br/> изменить свои персональные данные</p>
            </div>
            {(element) && element}
        </main>
    )
}

export default ProfilePage;