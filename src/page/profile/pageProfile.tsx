import style from './pageProfile.module.css'

import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FC, useEffect, useMemo } from "react";

import { postLogoutAuth } from "../../services/actions/logout";
import { getInfoUser } from "../../services/actions/infoUser";
import { postTokenAuth } from "../../services/actions/token";

import Modal from '../../components/Modal/Modal'
import {FeedDetails} from '../../components/FeedDetails/FeedDetails'

import {type TProfilePage} from '../../types/functionComponentType'
import { useAppDispatch, useAppSelector } from '../../types/typesReact';

const ProfilePage: FC<TProfilePage> = ({ element, onClose }) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { visible } = useAppSelector(state => state.modalReducer);
    const tokenSuccess = useAppSelector(state => state.tokenReducer.success)
    const tokenError = useAppSelector(state => state.tokenReducer.error)
    const logoutRequest = useAppSelector(state => state.logoutReducer.request);
    const {pathname} = useLocation()
    const classNav = (path: string) => {
      return (`${style.profile__link} text text_type_main-medium text_color_inactive ${pathname === path && style.profile__textColor}`)
    }

    useEffect(() => {
      if (tokenError === 'Ошибка: 401' && localStorage.getItem('refreshToken') !== null) {
        dispatch(postLogoutAuth(localStorage.getItem('refreshToken')!))
      }
    }, [dispatch, tokenError])

    useEffect(() => {
          if ((localStorage.getItem('accessToken')) && tokenSuccess) {
              dispatch(getInfoUser(localStorage.getItem('accessToken')!))
          }
    }, [dispatch, tokenSuccess])

    useEffect(() => {
      if (localStorage.getItem('refreshToken') === null) return;
      dispatch(postTokenAuth(localStorage.getItem('refreshToken')!))
    }, [dispatch])

    const onExit = () => {
      if (localStorage.getItem('refreshToken') === null) return;
      dispatch(postLogoutAuth(localStorage.getItem('refreshToken')!))
    };

    useEffect(() => {
      if (!localStorage.getItem('refreshToken')) {
        navigate('/', {replace: true})
      }
    }, [navigate])

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
                          to="/"
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