import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function ProtectedRouteElement({ element}) {
    const {pathname} = useLocation()


    const returnFotNotAuthorized = () => {
        localStorage.setItem('path', pathname)
        return localStorage.getItem('refreshToken') ? element : <Navigate to="/login" replace/>;
    }

    const returnFotAuthorized = () => {
        return localStorage.getItem('refreshToken') ? <Navigate to="/" replace/> : element;
    }

    if (element.type.name == 'ProfilePage') {
        return returnFotNotAuthorized();
    } else if (element.type.name == 'LodinPage') {
        return returnFotAuthorized();
    } else if (element.type.name == 'Register') {
        return returnFotAuthorized();
    } else if (element.type.name == 'ForgotPasswordPage') {
        return returnFotAuthorized();
    } else if (element.type.name == 'FeedDetails') {
        return returnFotNotAuthorized();
    } else if (element.type.name == 'ResetPasswordPage') {
        return (!localStorage.getItem('emailForgotPassword')) ? <Navigate to="/" replace/> : element;
    } else {
        return element
    }
} 