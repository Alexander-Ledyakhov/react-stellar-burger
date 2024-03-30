import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './pageRegister.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, FormEvent } from "react";

import { postRegister } from "../../services/actions/register";
import { useAppDispatch, useAppSelector } from '../../types/typesReact';

function Register() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const [userName, setUserName] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitRegister = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        dispatch(postRegister(email, password, userName))
    };

    const successRegister = useAppSelector(state => state.registerReducer.success);
    const errorRegister = useAppSelector(state => state.registerReducer.error);

    useEffect(() => {
        (successRegister) && (!errorRegister) && navigate('/', {replace: true})
    }, [successRegister, errorRegister, navigate])


    return (
        <main className={style.register}>
            <form className={style.register__form} onSubmit={evt => submitRegister(evt)}>
                <h1 className="text text_type_main-medium">Регистрация</h1>

                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={evt => setUserName(evt.target.value)}
                    value={userName}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <EmailInput
                    onChange={evt => setEmail(evt.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mt-6"
                />
                <PasswordInput
                    onChange={evt => setPassword(evt.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mt-6"
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
                    Зарегистрироваться
                </Button>

                <p className={`text text_type_main-default text_color_inactive mb-4`}>Уже зарегистрированы? 
                    <Link to='/login' className={style.register__link}>Войти</Link>
                </p>          
            </form>
        </main>
    )
}

export default Register;