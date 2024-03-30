import styles from "./pageConstructor.module.css";

import BurgerMenu from "../../components/burgerMenu/burgerMenu";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Modal from '../../components/Modal/Modal'
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails'
import OrderDetails from '../../components/OrderDetails/OrderDetails'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from "prop-types";
import { useAppSelector } from "../../types/typesReact";
import { TOnClose } from "../../types/functionComponentType";
import { FC } from "react";


const ConstructorPage: FC<TOnClose> = ({onClose}) => {
    const ingredients = useAppSelector(state => state.ingredientsReducer);
    const { visible, type } = useAppSelector(state => state.modalReducer);
  

    return (
        <main className={styles.main}>
            {(ingredients.isSuccess) && (
                <> 
                    { visible  && (
                        <Modal onClose={onClose}>
                            {(type === 'ingredient') && <IngredientDetails />}
                            {(type === 'order') && <OrderDetails />}
                        </Modal>
                    )}
                    <DndProvider backend={HTML5Backend}>
                        <BurgerMenu /> 
                        <BurgerConstructor />
                    </DndProvider>
                </>
            )}
        </main>
    )
}

ConstructorPage.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ConstructorPage;