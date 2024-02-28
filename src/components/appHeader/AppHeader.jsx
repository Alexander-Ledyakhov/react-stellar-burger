import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function AppHeader() {
  const {pathname} = useLocation()
  const path = pathname.split("/")[1]
  
  return (
    <header className={styles.header}>
      <div className={styles.header__shell}>
        <NavLink
          to="/"
          className={styles.logo}
        >
          <Logo />
        </NavLink>
        <nav>
          <ul className={styles.header__list + ' ' + styles.header__list_main} >
            <ul className={styles.header__list} >
              <li className={`pl-5 pr-5 pt-4 pb-4`}>
                <NavLink
                  to="/"
                  className={styles.header__link}
                >
                  <BurgerIcon type={path == '' ? 'primary' : 'secondary'} />
                  <p className={`text text_type_main-default pl-2 ${path !== '' && 'text_color_inactive'}`}>Конструктор</p>
                </NavLink>
              </li>
              <li className='pl-5 pr-5 pt-4 pb-4'>
                <a href="/feed" className={styles.header__link}>
                  <ListIcon type={path == 'feed' ? 'primary' : 'secondary'} />
                  <p className={`text text_type_main-default pl-2 ${path !== 'feed' && 'text_color_inactive'}`}>Лента заказов</p>
                </a>
              </li> 
            </ul>
            <li className='pl-5 pr-5 pt-4 pb-4'>
              <a href="/profile" className={styles.header__link}>
                <ProfileIcon type={path == 'profile' ? 'primary' : 'secondary'} />
                <p className={`text text_type_main-default pl-2 pr-5 ${path !== 'profile' && 'text_color_inactive'}`}>Личный кабинет</p>
              </a>
            </li>
          </ul>
        </nav>      
      </div>
    </header>
  ); 
}

export default AppHeader;