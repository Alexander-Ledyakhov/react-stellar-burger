import { FC } from "react";
import { TOnClose } from "../../types/functionComponentType";
import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay: FC<TOnClose> = ({onClose}) => {
    return <div className={`${styles.modalOverlay}`} onClick={onClose} />
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;