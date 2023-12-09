import BurgerMenu from "../burgerMenu/burgerMenu";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import AppHeader from "../appHeader/AppHeader";
import styles from "./app.module.css";

import getIngredientsApi from '../../utils/api'
import { useState, useEffect } from "react";


import Modal from '../Modal/Modal'

import IngredientDetails from '../IngredientDetails/IngredientDetails'
import OrderDetails from '../OrderDetails/OrderDetails'


function App() {
    
    const [data, setData] = useState({success: false, data: []})
    useEffect(() => {
        getIngredientsApi().then(json => setData({success: json.success, data: json.data})).catch((err) => console.log(err));
    }, [])


    const [open, setOpen] = useState(false);

    const [dataItem, setDataItem] = useState({type: '', item: {}, title: ''});
    const modalIngredientDetails = ( type, item, title) => {
        setDataItem({
            type: type,
            item: item, 
            title: title
        })
    }

    const modalOrderDetails = (type, title) => {
        setDataItem({
            type: type,
            item: {}, 
            title: title
        })
    }

    

    
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                {(data.success) && (
                    <> 
                        { open  && (
                            <Modal setOpen={setOpen} dataItem={dataItem}>
                                {(dataItem.type === 'ingredient') && <IngredientDetails data={dataItem.item}/>}
                                {(dataItem.type === 'order') && <OrderDetails />}
                            </Modal>
                        )}
                        <BurgerMenu data={data.data} setOpen={setOpen} modal={modalIngredientDetails} /> 
                        <BurgerConstructor data={data.data} setOpen={setOpen} modal={modalOrderDetails} />
                    </>
                )}
            </main>
        </>
    )
}





export default App;