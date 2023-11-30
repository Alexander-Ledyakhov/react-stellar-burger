import BurgerIngredients from "../burgerIngredients/BurgerIngredients"
import { useState } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerMenu() {

    const [category, setCategory] = useState('Bun')

    return (
        <section style={{ maxWidth: '600px' }}>
            <h1  className="text text_type_main-large pt-10 mb-5">Соберите бургер</h1>
            <div className='mb-10' style={{ display: 'flex' }}>
                <Tab value='bun' active={((category !== 'sauce') && (category !== 'main')) || category === 'bun'} onClick={setCategory}>Булки</Tab>
                <Tab value='sauce' active={category === 'sauce'} onClick={setCategory}>Соусы</Tab>
                <Tab value='main' active={category === 'main'} onClick={setCategory}>Начинки</Tab>
            </div>
            <BurgerIngredients />
        </section>
    )
}

export default BurgerMenu;