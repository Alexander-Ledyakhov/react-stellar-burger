import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import style from './pageForgotPassword.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { checkEmailApi } from "../../utils/api";

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [forgotPassword, setForgotPassword] = useState('')

    const submitEmail = (evt) => {
        evt.preventDefault()
        checkEmailApi(forgotPassword).then((json) => {
            if (json.success) {
                localStorage.setItem('emailForgotPassword', true)
                navigate('/reset-password', {replace: true})
            }
        })
    }

    return (
        <main className={style.forgotPassword}>
            <form className={style.forgotPassword__form} onSubmit={(evt) => submitEmail(evt)}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>

                <EmailInput
                    onChange={evt => setForgotPassword(evt.target.value)}
                    value={forgotPassword}
                    name={'email'}
                    isIcon={false}
                    extraClass="mt-6"
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
                    Восстановить
                </Button>

                <p className={`text text_type_main-default text_color_inactive mb-4`}>Вспомнили пароль? 
                    <Link to='/login' className={style.forgotPassword__link}>Войти</Link>
                </p>        
            </form>
        </main>
    )
}

export default ForgotPasswordPage;