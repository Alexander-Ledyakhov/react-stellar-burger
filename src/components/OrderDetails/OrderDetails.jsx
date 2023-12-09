import styles from "./orderDetails.module.css"
import img1 from '../../images/Vector1.png'
import img2 from '../../images/Vector2.png'
import img3 from '../../images/Vector3.png'
import checkMarkIcon from '../../images/checkMarkIcon.png'


function OrderDetails() {

    return (
        <div className={`${styles.orderDetails__content} mt-4 mb-30`}>
            <h3 className={`text text_type_digits-large`}>034536</h3>
            <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <div className={`${styles.orderDetails__icons} mt-15`}>
                <img src={img1} alt="" className={`${styles.orderDetails__icon1}`} />
                <img src={img2} alt="" className={`${styles.orderDetails__icon2}`} />
                <img src={img3} alt="" className={`${styles.orderDetails__icon3}`} />
                <img src={checkMarkIcon} alt="" className={`${styles.orderDetails__checkMarkIcon}`} />
            </div>
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails