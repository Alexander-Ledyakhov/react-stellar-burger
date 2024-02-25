import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './pageProfile.module.css'

import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { postLogoutAuth } from "../../services/actions/logout";
import { getInfoUser } from "../../services/actions/infoUser";
import { postTokenAuth } from "../../services/actions/token";
import { getInfoUserApi, patchInfoUserApi } from "../../utils/api";

function ProfilePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const infoUser = useSelector(state => state.infoUserReducer.user);
    const infoUserSuccess = useSelector(state => state.infoUserReducer.success);

    const tokenError = useSelector(state => state.tokenReducer.error)
    const tokenSuccess = useSelector(state => state.tokenReducer.success)


    const logoutSuccess = useSelector(state => state.logoutReducer.success)
    const logoutRequest = useSelector(state => state.logoutReducer.request);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [change, setChange] = useState(false)

    const setActive = ({isActive}) => isActive ? `${style.profile__link} ${style.profile__textColor} text text_type_main-medium` : `${style.profile__link} text text_type_main-medium text_color_inactive`

    useEffect(() => {
          if ((localStorage.getItem('accessToken')) && tokenSuccess) {
              dispatch(getInfoUser(localStorage.getItem('accessToken')))
          } else if ((!tokenSuccess) || (!localStorage.getItem('accessToken'))) {
              dispatch(postTokenAuth(localStorage.getItem('refreshToken')))
          } else if (tokenError) {
              dispatch(postLogoutAuth(localStorage.getItem('refreshToken')))
          }
    }, [dispatch, tokenSuccess, tokenError, localStorage.getItem('accessToken')])

    useEffect(() => {
      if(infoUserSuccess) {
        setEmail(infoUser.email)
        setName(infoUser.name)
      }
    }, [infoUserSuccess, infoUser.email, infoUser.name])



    const submitSave = (evt) => {
      evt.preventDefault();
      patchInfoUserApi(localStorage.getItem('accessToken'), email, password, name).then((json) => {
        setEmail(json.user.email)
        setName(json.user.name)
      }) 
      setChange(false)
    }


    const onCancel = (evt) => {
      evt.preventDefault();
      getInfoUserApi(localStorage.getItem('accessToken')).then((json) => {
        setEmail(json.user.email)
        setName(json.user.name)
      }) 
      setChange(false)
    }

    const onExit = () => {
      dispatch(postLogoutAuth(localStorage.getItem('refreshToken')))
    };


    
    useEffect(() => {
      if (!localStorage.getItem('refreshToken')) {
        navigate('/', {replace: true})
      }
    }, [navigate, localStorage.getItem('refreshToken')])

    useEffect(() => {
      if ((logoutSuccess)  && (localStorage.getItem('refreshToken'))) {
        dispatch(postLogoutAuth(localStorage.getItem('refreshToken')))
      }
    }, [logoutSuccess, localStorage.getItem('refreshToken')])

    const textExit = useMemo(() => {
      return (logoutRequest) ? 'Выход..' : 'Выход'
    }, [logoutRequest]);
    


    return (
        <main className={style.profile}>
            <div className={style.profile_nav}>
                <nav>
                    <li className={style.profile_li}>
                        <NavLink
                          to="/profile"
                          className={setActive}
                        >
                          Профиль
                        </NavLink>
                    </li>

                    <li className={style.profile_li}>
                        <NavLink
                          to="/profile/orders"
                          className={setActive}
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
            

            <form className={style.profile__form} onSubmit={(evt) => submitSave(evt)}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={evt => {
                          setChange(true)
                          setName(evt.target.value)
                        }}
                        icon={'EditIcon'}
                        value={name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="mb-6"
                    />   
                    <EmailInput
                        onChange={evt => {
                          setChange(true)
                          setEmail(evt.target.value)
                        }}
                        value={email}
                        name={'email'}
                        placeholder="Логин"
                        isIcon={true}
                        extraClass="mb-6"
                    />    
                    <PasswordInput
                        onChange={evt => {
                          setChange(true)
                          setPassword(evt.target.value)
                        }}
                        value={password}
                        name={'password'}
                        icon='EditIcon'
                    />


                    {change && (
                      <div className={`mt-6 ${style.profile_update}`}>
                        <Button
                          htmlType="button"
                          type="secondary"
                          size="large"
                          onClick={(evt) => onCancel(evt)}
                        >
                          Отмена
                        </Button>

                        <Button 
                          htmlType="submit" 
                          type="primary" 
                          size="medium"
                        >
                          Сохранить
                        </Button>
                      </div>
                    )}
            </form>
        </main>
    )
}

export default ProfilePage;