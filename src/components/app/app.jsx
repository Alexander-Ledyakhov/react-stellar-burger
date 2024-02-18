import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

import AppHeader from "../appHeader/AppHeader";
import { ProtectedRouteElement } from '../ProtectedRouteElement';
import OrderDetails from '../OrderDetails/OrderDetails'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

import ConstructorPage from '../../page/constructor/pageConstructor'
import LodinPage from '../../page/login/pageLogin'
import Register from '../../page/register/pageRegister'
import ForgotPasswordPage from '../../page/forgotPassword/pageForgotPassword'
import ResetPasswordPage from '../../page/resetPassword/pageResetPassword'
import ProfilePage from '../../page/profile/pageProfile'
import { getIngredients } from '../../services/actions/allIngredients';

function App() {

    const dispatch = useDispatch();
    const { visible, type } = useSelector(state => state.modalReducer);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    return (
        <>
            <AppHeader />
                <Routes>
                    <Route exact path="/" element={<ConstructorPage />}>
                        {(visible) &&
                                <Route path='/ingredients/:id' element={
                                        <Modal>
                                            {(type === 'ingredient') && <IngredientDetails />}
                                            {(type === 'order') && <OrderDetails />}
                                        </Modal>
                                } />
                        }
                    </Route>
                    <Route path="/login" element={<ProtectedRouteElement element={<LodinPage />} />} />
                    <Route path="/register" element={<ProtectedRouteElement element={<Register />} />} />
                    <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
                    <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
                    <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
                </Routes>
                {(!visible) &&
                    <Routes>
                        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
                    </Routes>}
        </>
    )
}

export default App;