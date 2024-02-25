import styles from "./modal.module.css";

import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

import { CloseIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import ModalOverlay from '../ModalOverlay/ModalOverlay'

function Modal({ onClose, children }) {

    const { visible, title } = useSelector(state => state.modalReducer);

    useEffect(() => {
        const handleEscClose = (evt) => {
            (evt.key === "Escape") && onClose();
        }
        document.addEventListener("keydown", handleEscClose);
        return () => document.removeEventListener("keydown", handleEscClose)
    }, []);

    return (
        <>
            <div className={`${visible && styles.popup_opened} ${styles.popup}`}>
                <ModalOverlay onClose={onClose} />
                <div className={`${styles.popup__container}`}>
                    <div className={`${styles.popup__header}`}>
                        <h2 className="text text_type_main-large">{title}</h2>
                        <Button 
                            htmlType="button" 
                            type="secondary" 
                            size="small" 
                            extraClass={`${styles.popup__btn}`}
                            onClick={onClose} >
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
    onClose: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
}

export default Modal;