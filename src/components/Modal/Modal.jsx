import styles from "./modal.module.css";
import { useEffect } from "react";
import { CloseIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from '../ModalOverlay/ModalOverlay'

import { modalDataItem } from "../../utils/prop-types";
import PropTypes from "prop-types";
 
function Modal({children, dataItem, ...props}) {

    useEffect(() => {
        const handleEscClose = (evt) => {
            (evt.key === "Escape") && props.setOpen(false);
        }
        document.addEventListener("keydown", handleEscClose);
        return () => document.removeEventListener("keydown", handleEscClose)
    }, [props]);

    return (
        <div className={`${props.setOpen && styles.popup_opened} ${styles.popup}`}>
            <ModalOverlay setOpen={props.setOpen} />
            <div className={`${styles.popup__container}`}>
                <div className={`${styles.popup__header}`}>
                    <h2 className="text text_type_main-large">{dataItem.title}</h2>
                    <Button 
                        htmlType="button" 
                        type="secondary" 
                        size="small" 
                        extraClass={`${styles.popup__btn}`} 
                        onClick={() => props.setOpen(false)} >
                        <CloseIcon type="primary" />
                    </Button>
                </div>
                {children}
            </div>   
        </div>
    )
}

Modal.propTypes = {
    dataItem: modalDataItem.isRequired,
    setOpen: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
}

export default Modal;