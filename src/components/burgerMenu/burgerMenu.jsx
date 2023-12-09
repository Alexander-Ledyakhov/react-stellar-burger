import BurgerIngredients from "../burgerIngredients/BurgerIngredients"
import { useState } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burgerMenu.module.css";
 
import { ingredientsArrPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

function BurgerMenu(props) {

    const [category, setCategory] = useState('Bun')

    return (
        <section className={styles.menu} >
            <h1  className="text text_type_main-large pt-10 mb-5">Соберите бургер</h1>
            <div className={`${styles.menu__tab} mb-10`} >
                <Tab value='bun' active={((category !== 'sauce') && (category !== 'main')) || category === 'bun'} onClick={setCategory}>Булки</Tab>
                <Tab value='sauce' active={category === 'sauce'} onClick={setCategory}>Соусы</Tab>
                <Tab value='main' active={category === 'main'} onClick={setCategory}>Начинки</Tab>
            </div>
            <BurgerIngredients data={props.data} setOpen={props.setOpen} modal={props.modal} />
        </section>
    )
}

BurgerMenu.propTypes = {
    data: ingredientsArrPropType.isRequired,
    setOpen: PropTypes.func.isRequired,
    modal: PropTypes.func.isRequired
}

export default BurgerMenu;