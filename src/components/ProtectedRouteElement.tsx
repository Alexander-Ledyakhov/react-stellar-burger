import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { type TElement } from '../types/functionComponentType';
import { FC } from 'react';

export const ProtectedRouteElement: FC<TElement> = ({ element}) => {
    const {pathname} = useLocation()
    const type = element.type as {name: string}
    const nameElement = type.name

    const returnFotNotAuthorized = () => {
        localStorage.setItem('path', pathname)
        return localStorage.getItem('refreshToken') ? element : <Navigate to="/login" replace/>;
    }

    const returnFotAuthorized = () => {
        return localStorage.getItem('refreshToken') ? <Navigate to="/" replace/> : element;
    }

    if (nameElement === 'ProfilePage') {
        return returnFotNotAuthorized();
    } else if (nameElement === 'LodinPage') {
        return returnFotAuthorized();
    } else if (nameElement === 'Register') {
        return returnFotAuthorized();
    } else if (nameElement === 'ForgotPasswordPage') {
        return returnFotAuthorized();
    } else if (nameElement === 'FeedDetails') {
        return returnFotNotAuthorized();
    } else if (nameElement === 'ResetPasswordPage') {
        return (!localStorage.getItem('emailForgotPassword')) ? <Navigate to="/" replace/> : element;
    } else {
        return element
    }
} 