import styles from "./ingredientDetails.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../types/typesReact";
import { TIngredient } from "../../types/typesApi";

function IngredientDetails() {
    const { visible } = useAppSelector(state => state.modalReducer);
    const [item, setItem] = useState<TIngredient>()
    const [itemId, setItemId] = useState('')
    const { ingredientId, id } = useParams();
    const {allIngredients, isSuccess} = useAppSelector(state => state.ingredientsReducer);

    useEffect(() => {
        if (ingredientId) {
            setItemId(ingredientId)
        }
        if (id) {
            setItemId(id)
        }
    }, [ingredientId, id])

    useEffect(() => {
        const ingredient = allIngredients.find((allIngredient: TIngredient) => allIngredient._id === itemId) as TIngredient
        setItem(ingredient);
    }, [isSuccess, allIngredients, item, itemId])

    return (
        <>
            {(item) && 
                <div className={`${!visible && styles.ingredientDetails__notModal} ${styles.ingredientDetails__content}`}>
                    <img src={item.image} alt={`картинка ${item.name}`} className={`${styles.ingredientDetails__image}`} />
                    <div className={`${styles.ingredientDetails__about}`} >
                        <p className={`${styles.ingredientDetails__name} text text_type_main-medium`}>{item.name}</p>
                        <div className={`${styles.ingredientDetails__nutrients}`}>

                            <div className={`${styles.ingredientDetails__nutrientsEl}`}>
                                <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                                <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
                            </div>
                            <div className={`${styles.ingredientDetails__nutrientsEl}`}>
                                <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                                <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
                            </div>
                            <div className={`${styles.ingredientDetails__nutrientsEl}`}>
                                <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                                <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
                            </div>
                            <div className={`${styles.ingredientDetails__nutrientsEl}`}>
                                <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                                <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default IngredientDetails;