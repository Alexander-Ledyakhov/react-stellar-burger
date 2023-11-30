import BurgerMenu from "./burgerMenu/burgerMenu";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import AppHeader from "./appHeader/AppHeader";

export default function App() {
    return (
        <>
            <AppHeader />
            <main style={{ display: 'flex', justifyContent: 'center' }}>
                <BurgerMenu />
                <BurgerConstructor />
            </main>
        </>
    )
}