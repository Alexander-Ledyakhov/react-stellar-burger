import styles from "./burger-ingredients.module.css";
import { data } from "../../utils/data";
import BurgerIngredient from "../burgerIngredient/BurgerIngredient"
import PropTypes from "prop-types";

function BurgerIngredients() {

    const bun = [];
    const sauce = [];
    const main = [];
    
    data.forEach((item) => {
        if(item.type === 'bun')
            bun.push(<BurgerIngredient item={item} key={item._id}/>)
        else if(item.type === 'sauce')
            sauce.push(<BurgerIngredient item={item} key={item._id}/>)
        else if(item.type === 'main')
            main.push(<BurgerIngredient item={item} key={item._id}/>)
        else
            console.log(`Какая-то новая категория - ${item.type}`)
    })
    
    return (
        <>
            <div className='custom-scroll custom-scroll-margin' 
                style={{maxHeight: '756px',overflowY: 'scroll'}}>
                <h2 className="text text_type_main-medium">Булки</h2>
                <div className={styles.items}>{bun}</div>
                <h2 className="text text_type_main-medium">Соусы</h2>
                <div className={styles.items}>{sauce}</div>
                <h2 className="text text_type_main-medium">Начинки</h2>
                <div className={styles.items}>{main}</div>                
            </div>
        </>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    }),
};

export default BurgerIngredients;