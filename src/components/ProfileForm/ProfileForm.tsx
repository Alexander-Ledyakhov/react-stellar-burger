import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './profileForm.module.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, FormEvent, SyntheticEvent } from "react";
import { getInfoUserApi, patchInfoUserApi } from "../../utils/api";
import { useAppSelector } from '../../types/typesReact';

function ProfileForm() {
    const navigate = useNavigate();
    const infoEmail = useAppSelector(state => state.infoUserReducer.email);
    const infoName = useAppSelector(state => state.infoUserReducer.name);
    const infoUserSuccess = useAppSelector(state => state.infoUserReducer.success);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [change, setChange] = useState(false)

    useEffect(() => {
      if(infoUserSuccess) {
        setEmail(infoEmail)
        setName(infoName)
      }
    }, [infoUserSuccess, infoEmail, infoName])

    const submitSave = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      if (localStorage.getItem('accessToken') === null ) return;
      patchInfoUserApi(localStorage.getItem('accessToken')!, email, password, name).then((json) => {
        setEmail(json.user.email)
        setName(json.user.name)
      }) 
      setChange(false)
    }
    
    const onCancel = (evt: SyntheticEvent<Element, Event>) => {
      evt.preventDefault();
      if (localStorage.getItem('accessToken') === null ) return;
      getInfoUserApi(localStorage.getItem('accessToken')!).then((json) => {
        setEmail(json.user.email)
        setName(json.user.name)
      }) 
      setChange(false)
    }

    useEffect(() => {
      if (!localStorage.getItem('refreshToken')) {
        navigate('/', {replace: true})
      }
    }, [navigate])

    return (
        <section>
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
        </section>
    )
}

export default ProfileForm;