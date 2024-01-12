import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({closeModal}) {
    return <div className={`${styles.modalOverlay}`} onClick={closeModal} />
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;