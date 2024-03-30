import styles from "./modal.module.css";
import { FC, useEffect } from "react";
import { CloseIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { TModal } from "../../types/functionComponentType";
import { useAppSelector } from "../../types/typesReact";

const Modal: FC<TModal> = ({ onClose, children }) => {

    const { visible, title } = useAppSelector(state => state.modalReducer);

    useEffect(() => {
        const handleEscClose = (evt: KeyboardEvent) => {
            (evt.key === "Escape") && onClose();
        }
        document.addEventListener("keydown", handleEscClose);
        return () => document.removeEventListener("keydown", handleEscClose)
    }, [onClose]);

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

export default Modal;