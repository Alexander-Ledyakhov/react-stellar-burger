import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useCallback } from "react";

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
import ProfileOrders from '../ProfileOrders/ProfileOrders'
import ProfileForm from '../ProfileForm/ProfileForm'

import { getIngredients } from '../../services/actions/allIngredients';
import { MODAL_CLOSE } from '../../services/actions/modal';

import {FeedPage} from '../../page/feed/pageFeed'
import {FeedDetails} from '../FeedDetails/FeedDetails'
import { useAppDispatch, useAppSelector } from '../../types/typesReact';

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { visible, type } = useAppSelector(state => state.modalReducer);
    const location = useLocation();
    const pathname = location.state && location.state.pathname;

    const onClose = useCallback(() => {
        dispatch({
            type: MODAL_CLOSE
        })
        if (!pathname) {   
            navigate('/', {replace: true})
        } else if (pathname) {
            navigate(`${pathname.pathname}`, {replace: true})
        }
    }, [dispatch, navigate, pathname])

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    return (
        <>
            <AppHeader />
                <Routes>
                    <Route path="/" element={<ConstructorPage onClose={onClose} />}>
                        {(visible) &&
                                <Route path='/ingredients/:id' element={
                                        <Modal onClose={onClose} >
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
                    <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage onClose={onClose} element={<ProfileForm/>} />} />}  />                      
                    <Route path='/profile/orders' element={<ProtectedRouteElement element={<ProfilePage onClose={onClose} element={<ProfileOrders/>} />} />}  >
                        {(visible) &&
                                <Route path='/profile/orders/:numberId' element={
                                    <Modal onClose={onClose}>
                                        <FeedDetails />
                                    </Modal>
                                } />
                        }
                    </Route>
                    <Route path="/feed" element={<FeedPage onClose={onClose} />}>
                        {(visible) &&
                                <Route path='/feed/:numberId' element={
                                    <Modal onClose={onClose}>
                                        <FeedDetails />
                                    </Modal>
                                } />
                        }
                    </Route>
                </Routes>


                {(!visible) &&
                    <Routes>
                        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
                    </Routes>}

                {!visible && (
                    <Routes>
                        <Route path='/feed/:numberId' element={<FeedDetails />} />
                    </Routes>
                )}

                {!visible && (
                    <Routes>
                        <Route path="/profile/orders/:numberId" element={<ProtectedRouteElement element={<FeedDetails />} />} />
                    </Routes>
                    
                )}
        </>
    )
}

export default App;