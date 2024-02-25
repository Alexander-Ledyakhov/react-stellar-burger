import styles from './iconIngredients.module.css';

const IconIngredients = ({ingredients, index, allIndex}) => {

    const icon = () => {
        return (
            <img className={styles.iconIngredients_img} src={ingredients.image} alt={`иконка ингридиента "${ingredients.name}"`}/>
        )
    }

    const i = allIndex - 6

    const iconIngredients = () => {
        if(i > 6){
            if (index === 5) {
                return (
                    <>
                        <div className={styles.iconIngredients_indexMax}>
                            <p className={`text text_type_digits-default ${styles.iconIngredients_count}`}>+{i}</p>
                            <div className={styles.iconIngredients_opacity}>
                                {icon()}
                            </div>
                        </div>
                    </>
                )
            } else {
                return icon()
            }
        } else {
            return icon()
        }
    }

    return (
        <div className={styles.iconIngredients_imgBorder}>
            <div className={styles.iconIngredients_imgBackground}>
                {iconIngredients()}
            </div>
        </div>
    )
}

export default IconIngredients