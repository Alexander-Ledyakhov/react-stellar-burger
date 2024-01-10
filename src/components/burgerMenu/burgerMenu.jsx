import BurgerIngredients from "../burgerIngredients/BurgerIngredients"
import { useState, useEffect } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burgerMenu.module.css";


function BurgerMenu() {

    const [category, setCategory] = useState('bun')

    useEffect(() => {
        const menu = document.querySelector('#menu')
        function scrollDistance() {
            let distance = menu.scrollTop + 30;

            const categoryMenu = menu.querySelectorAll('#categoryMenu')
            const bun = categoryMenu[0].offsetHeight
            const sauce = categoryMenu[1].offsetHeight
            const main = categoryMenu[2].offsetHeight

            if (bun > distance) setCategory('bun');
                else if ((sauce + bun) > distance) setCategory('sauce');
                else if ((main + sauce + bun) > distance) setCategory('main');
        }
        menu.addEventListener('scroll', () => scrollDistance());  
        return () => menu.removeEventListener('scroll', () => scrollDistance())
    }, [setCategory])

    return (
        <section className={styles.menu} >
            <h1  className="text text_type_main-large pt-10 mb-5">Соберите бургер</h1>
            <div className={`${styles.menu__tab} mb-10`} >
                <Tab value='bun' active={category === 'bun'} onClick={evt => setCategory(evt)}>Булки</Tab>
                <Tab value='sauce' active={category === 'sauce'} onClick={evt => setCategory(evt)}>Соусы</Tab>
                <Tab value='main' active={category === 'main'} onClick={evt => setCategory(evt)}>Начинки</Tab>
            </div>
            <BurgerIngredients />
        </section>
    )
}

export default BurgerMenu;