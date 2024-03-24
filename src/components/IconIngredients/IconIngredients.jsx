import styles from './iconIngredients.module.css';

const IconIngredients = ({ingredients, index, allIndex}) => {

    return (
        <div className={styles.iconIngredients_imgBorder}>
            <div className={styles.iconIngredients_imgBackground}>
                {
                    (allIndex > 6 && index === 5) ? (
                        <div className={styles.iconIngredients_indexMax}>
                            <p className={`text text_type_digits-default ${styles.iconIngredients_count}`}>+{allIndex - 6}</p>
                            <div className={styles.iconIngredients_opacity}>
                                <img className={styles.iconIngredients_img} src={ingredients.image} alt={`иконка ингридиента "${ingredients.name}"`}/>
                            </div>
                        </div>
                    ) : (
                        <img className={styles.iconIngredients_img} src={ingredients.image} alt={`иконка ингридиента "${ingredients.name}"`}/>
                    )
                }
            </div>
        </div>
    )
}

export default IconIngredients