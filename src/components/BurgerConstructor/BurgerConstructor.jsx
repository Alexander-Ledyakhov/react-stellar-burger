import styles from "./burgerConstructor.module.css"
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { data } from "../../utils/data";
import { ingredientsArrPropType } from "../../utils/prop-types";

function BurgerConstructor() {

        const buns = [];

        data.forEach((item) => {
            if(item.type === 'bun')
                buns.push(item)
        })
        const bun = buns[0]

    return (
        <section className={`${styles.constructor} mt-20 ml-10`} >
            <ul className={`${styles.constructor__items_main} pl-4`}>

                <li className='ml-8'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}/>
                </li>

                <ul className={`${styles.constructor__items} custom-scroll`} >
                    {data.map(itemData => (
                        <li key={itemData._id} className={styles.constructor__item} >
                            <DragIcon type="primary"/>
                            <div className={`${styles.constructor__ingredient} ml-2`}>
                                <ConstructorElement
                                    text={`${itemData.name} (низ)`}
                                    price={itemData.price}
                                    thumbnail={itemData.image}/>
                            </div>
                        </li>
                    ))}
                </ul>

                <li className={"ml-8"}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}/>
                </li>
            </ul>
            
            <div className={`${styles.constructor__summarizing} mt-10 mr-4`} >
                <div className={`${styles.constructor__price} mr-10`} >
                    <p className="text text_type_digits-medium mr-2">610</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>

        </section>
    )
}

BurgerConstructor.propTypes = {
    data: ingredientsArrPropType.isRequired
}

export default BurgerConstructor;