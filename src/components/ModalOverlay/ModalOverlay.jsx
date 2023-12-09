import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";
 
function ModalOverlay(props) {
    return <div className={`${styles.modalOverlay}`} onClick={() => props.setOpen(false)} />
}

ModalOverlay.propTypes = {
    setOpen: PropTypes.func.isRequired
}

export default ModalOverlay;