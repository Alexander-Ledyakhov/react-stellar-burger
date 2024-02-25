import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({onClose}) {
    return <div className={`${styles.modalOverlay}`} onClick={onClose} />
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;