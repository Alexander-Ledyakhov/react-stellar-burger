import {  Input, PasswordInput , Button } from "@ya.praktikum/react-developer-burger-ui-components"
import style from './pageResetPassword.module.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
import { resetPasswordApi } from "../../utils/api";

function ResetPasswordPage() {

    const [password, setPassword] = useState('')
    const [codePassword, setCodePassword] = useState('')

    const resetPassword = (evt) => {
        evt.preventDefault();
        resetPasswordApi(password, codePassword)
    }

    return (
        <main className={style.resetPassword}>
            <form className={style.resetPassword__form} onSubmit={(evt) => resetPassword(evt)}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>  

                <PasswordInput
                    onChange={evt => setPassword(evt.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mt-6"
                />

                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={evt => setCodePassword(evt.target.value)}
                    value={codePassword}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
                    Сохранить
                </Button>

                <p className={`text text_type_main-default text_color_inactive mb-4`}>Вспомнили пароль? 
                    <Link to='/login' className={style.resetPassword__link}>Войти</Link>
                </p>
            </form>
        </main>
    )
}

export default ResetPasswordPage;