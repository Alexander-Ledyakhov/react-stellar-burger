import BurgerMenu from "../burgerMenu/burgerMenu";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import AppHeader from "../appHeader/AppHeader";
import styles from "./app.module.css";

function App() {
    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <BurgerMenu />
                <BurgerConstructor />
            </main>
        </>
    )
}

export default App;