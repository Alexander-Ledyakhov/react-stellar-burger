import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './pageLogin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo, FormEvent } from "react";
import { postAuth } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from '../../types/typesReact';

function LodinPage() {    

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const { success, error, request  } = useAppSelector(state => state.authReducer);

    const textEnter = useMemo(() => {
        return (request) ? 'Вход..' : 'Войти'
    }, [request]);

    const submitLodin = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(postAuth(email, password));
    }

    useEffect(() => {
        (success) && 
        (!error) && 
        (navigate((localStorage.getItem('path')!) ? 
            localStorage.getItem('path')! : 
            '/', {replace: true}))

    }, [success, error, navigate])

    return (
        <main className={style.login}>
                <form className={style.login__form} onSubmit={evt => submitLodin(evt)}>
                    <h1 className="text text_type_main-medium">Вход</h1>

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
                        {textEnter}
                    </Button>

                    <p className={`text text_type_main-default text_color_inactive mb-4`}>Вы — новый пользователь? 
                        <Link to='/register' className={style.login__link}>Зарегистрироваться</Link>
                    </p>
                    <p className='text text_type_main-default text_color_inactive'>Забыли пароль? 
                        <Link to='/forgot-password' className={style.login__link}>Восстановить пароль</Link>
                    </p>
                </form>
        </main>
        
    )
}

export default LodinPage;