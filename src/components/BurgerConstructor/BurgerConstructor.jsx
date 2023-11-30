import styles from "./burgerConstructor.module.css"
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { data } from "../../utils/data";
import PropTypes from "prop-types";

function BurgerConstructor() {

        const buns = [];
        const ingredients = data

        data.forEach((item) => {
            if(item.type === 'bun')
                buns.push(item)
        })
        const bun = buns[0]

    return (
        <section className='mt-20 ml-10' style={{ maxWidth: '600px', maxHeight: '696px', position: "relative"}}>
            <ul className={`${styles.constructorItems} pl-4`}>

                <li className='ml-8'>
                    <ConstructorElement
                        type={"top"}
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}/>
                </li>

                <ul className='custom-scroll'
                    style={{ 
                        maxHeight: '464px', 
                        overflowY: 'scroll', 
                        display: 'grid', 
                        rowGap: '16px', 
                        padding: '0px'
                    }}>
                    {ingredients.map(itemData => (
                        <li key={itemData._id}  style={{ width: '568px', display: 'flex', alignItems: 'center'}}>
                            <DragIcon type={"primary"}/>
                            <div className='ml-2' style={{ width: '100%'}}>
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
                        type={"bottom"}
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}/>
                </li>
            </ul>
            
            <div className='mt-10 mr-4' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className='mr-10' style={{ display: 'flex', alignItems: 'center' }}>
                    <p className="text text_type_digits-medium mr-2">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>

        </section>
    )
}

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;