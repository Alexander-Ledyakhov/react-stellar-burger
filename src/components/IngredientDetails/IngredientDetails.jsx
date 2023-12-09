import styles from "./ingredientDetails.module.css"
import { ingredientObjectPropType } from "../../utils/prop-types";

function IngredientDetails(props) {

    return (
        <div className={`${styles.ingredientDetails__content}`}>
            <img src={props.data.image} alt={`картинка ${props.data.name}`} className={`${styles.ingredientDetails__image}`} />
            
            <div className={`${styles.ingredientDetails__about}`} >
                <p className={`${styles.ingredientDetails__name} text text_type_main-medium`}>{props.data.name}</p>
                <div className={`${styles.ingredientDetails__nutrients}`}>

                    <div className={`${styles.ingredientDetails__nutrientsEl}`}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{props.data.calories}</p>
                    </div>
                    <div className={`${styles.ingredientDetails__nutrientsEl}`}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{props.data.proteins}</p>
                    </div>
                    <div className={`${styles.ingredientDetails__nutrientsEl}`}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{props.data.fat}</p>
                    </div>
                    <div className={`${styles.ingredientDetails__nutrientsEl}`}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{props.data.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    data: ingredientObjectPropType.isRequired
}

export default IngredientDetails;