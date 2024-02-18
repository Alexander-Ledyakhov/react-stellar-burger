import { Navigate } from 'react-router-dom';

export function ProtectedRouteElement({ element}) {

    const notAuthorized = () => {
        return localStorage.getItem('refreshToken') ? element : <Navigate to="/login" replace/>;
    }

    const authorized = () => {
        return localStorage.getItem('refreshToken') ? <Navigate to="/" replace/> : element;
    }

    if (element.type.name == 'ProfilePage') {
        localStorage.setItem('path', '/profile')
        return notAuthorized();
    } else if (element.type.name == 'LodinPage') {
        return authorized();
    } else if (element.type.name == 'Register') {
        return authorized();
    } else if (element.type.name == 'ForgotPasswordPage') {
        return authorized();
    } else if (element.type.name == 'ResetPasswordPage') {
        return (!localStorage.getItem('emailForgotPassword')) ? <Navigate to="/" replace/> : element;
    } else {
        return element
    }
} 