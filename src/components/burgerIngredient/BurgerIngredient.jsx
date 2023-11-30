import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredient(props) {
    return (
        <div 
            style={{ display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                width: '272px',
                minHeight: '208px'}}> 
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={`${props.item.image}`} 
                alt={`картинка ${props.item.name}`}/>
            <div className='mt-2 mb-2'
                style={{ 
                    display: 'grid',
                    gridAutoFlow: 'column', 
                    alignItems: 'center',
                    gap: '9px'
                }}>
                <p className='text text_type_digits-default'>{props.item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className='text text_type_main-default' style={{ textAlign: 'center' }}>
                {props.item.name}
            </p>
        </div>
    );
}

export default BurgerIngredient;