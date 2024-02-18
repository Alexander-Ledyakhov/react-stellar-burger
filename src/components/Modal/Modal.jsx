import styles from "./modal.module.css";
import { useEffect } from "react";
import { CloseIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from '../ModalOverlay/ModalOverlay'

import PropTypes from "prop-types";

import { useSelector, useDispatch } from 'react-redux';
import { MODAL_CLOSE } from '../../services/actions/modal';
import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

function Modal({ children }) {

    const { visible, title } = useSelector(state => state.modalReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const closeModal = useCallback(() => {
        dispatch({
            type: MODAL_CLOSE
        })
        navigate('/', {replace: true})
    }, [dispatch, navigate])

    useEffect(() => {
        const handleEscClose = (evt) => {
            (evt.key === "Escape") && closeModal();
        }
        document.addEventListener("keydown", handleEscClose);
        return () => document.removeEventListener("keydown", handleEscClose)
    }, [closeModal]);

    return (
        <>
            <div className={`${visible && styles.popup_opened} ${styles.popup}`}>
                <ModalOverlay closeModal={closeModal} />
                <div className={`${styles.popup__container}`}>
                    <div className={`${styles.popup__header}`}>
                        <h2 className="text text_type_main-large">{title}</h2>
                        <Button 
                            htmlType="button" 
                            type="secondary" 
                            size="small" 
                            extraClass={`${styles.popup__btn}`} 
                            onClick={() => closeModal()} >
                            <CloseIcon type="primary" />
                        </Button>
                    </div>
                    {children}
                </div>   
            </div>
        </>
    )
}

Modal.propTypes = {
    children: PropTypes.array.isRequired
}

export default Modal;