import { Navigate } from 'react-router-dom';

export function ProtectedRouteElement({ element}) {

    const returnFotNotAuthorized = () => {
        return localStorage.getItem('refreshToken') ? element : <Navigate to="/login" replace/>;
    }

    const returnFotAuthorized = () => {
        return localStorage.getItem('refreshToken') ? <Navigate to="/" replace/> : element;
    }

    if (element.type.name == 'ProfilePage') {
        localStorage.setItem('path', '/profile')
        return returnFotNotAuthorized();
    } else if (element.type.name == 'LodinPage') {
        return returnFotAuthorized();
    } else if (element.type.name == 'Register') {
        return returnFotAuthorized();
    } else if (element.type.name == 'ForgotPasswordPage') {
        return returnFotAuthorized();
    } else if (element.type.name == 'ResetPasswordPage') {
        return (!localStorage.getItem('emailForgotPassword')) ? <Navigate to="/" replace/> : element;
    } else {
        return element
    }
} 