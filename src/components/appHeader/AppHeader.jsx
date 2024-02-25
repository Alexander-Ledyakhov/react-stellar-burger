import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
 
function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__shell}>
        <a href="/#" className={styles.logo} ><Logo /></a>
        <nav>
          <ul className={styles.header__list + ' ' + styles.header__list_main} >
            <ul className={styles.header__list} >
              <li className='pl-5 pr-5 pt-4 pb-4'>
                <a href="/#" className={styles.header__link}>
                  <BurgerIcon type="primary" />
                  <p className="text text_type_main-default pl-2">Конструктор</p>
                </a>
              </li>
              <li className='pl-5 pr-5 pt-4 pb-4'>
                <a href="/#" className={styles.header__link}>
                  <ListIcon type="secondary" />
                  <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
                </a>
              </li> 
            </ul>
            <li className='pl-5 pr-5 pt-4 pb-4'>
              <a href="/profile" className={styles.header__link}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive pl-2 pr-5">Личный кабинет</p>
              </a>
            </li>
          </ul>
        </nav>      
      </div>
    </header>
  );
}

export default AppHeader;