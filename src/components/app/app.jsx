import BurgerMenu from "../burgerMenu/burgerMenu";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import AppHeader from "../appHeader/AppHeader";
import styles from "./app.module.css";

import { useEffect } from "react";


import Modal from '../Modal/Modal'

import IngredientDetails from '../IngredientDetails/IngredientDetails'
import OrderDetails from '../OrderDetails/OrderDetails'



import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getIngredients } from '../../services/actions/allIngredients';
import { useSelector, useDispatch } from 'react-redux';



function App() {


    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredientsReducer);
    const { visible, type } = useSelector(state => state.modalReducer);
  
    useEffect(() => {
      dispatch(getIngredients());    
    }, [dispatch]) 

    return (
        <>
            <AppHeader />
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
        </>
    )
}

export default App;