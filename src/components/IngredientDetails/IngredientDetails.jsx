import styles from "./ingredientDetails.module.css"
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function IngredientDetails() {
    const { visible } = useSelector(state => state.modalReducer);
    const [item, setItem] = useState('')
    const [itemId, setItemId] = useState('')
    const { ingredientId, id } = useParams();
    const {allIngredients, isSuccess} = useSelector(state => state.ingredientsReducer);

    useEffect(() => {
        if (ingredientId) {
            setItemId(ingredientId)
        }
        if (id) {
            setItemId(id)
        }
    }, [ingredientId, id])

    useEffect(() => {
        setItem(allIngredients.find(allIngredient => {
            return allIngredient._id === itemId
        }));
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