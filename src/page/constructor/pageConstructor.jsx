import BurgerMenu from "../../components/burgerMenu/burgerMenu";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Modal from '../../components/Modal/Modal'
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails'
import OrderDetails from '../../components/OrderDetails/OrderDetails'

import styles from "./pageConstructor.module.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from 'react-redux';




function ConstructorPage() {
    const ingredients = useSelector(state => state.ingredientsReducer);
    const { visible, type } = useSelector(state => state.modalReducer);
  

    return (
        <main className={styles.main}>
            {(ingredients.isSuccess) && (
                <> 
                    { visible  && (
                        <Modal>
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

export default ConstructorPage;