import React, { useContext } from 'react';
import styles from './Nav.module.css';
import NavigationLink from './NavigationLink';
import { RouterContext } from '../../Router';
import Calendar from '../../assets/icons/calendar.svg?react';
import Sun from '../../assets/icons/sun.svg?react';
import List from '../../assets/icons/list.svg?react';
import Stack from '../../assets/icons/stack.svg?react';
import Circle from '../../assets/icons/circle.svg?react';
function Nav() {
  const { currentPath } = useContext(RouterContext);

  return (
    <aside className={styles.nav}>
      <div className={styles.logo}>
        <Calendar />
        <h1>To Do App</h1>
      </div>
      <ul className={styles.nav__list}>
        <li>
          <NavigationLink
            to="/"
            styles={currentPath === '/' ? styles.activeLink : styles.unActiveLink}>
            <List />
            <span>Все</span>
          </NavigationLink>
        </li>

        <li>
          <NavigationLink
            to="/today"
            styles={currentPath === '/today' ? styles.activeLink : styles.unActiveLink}>
            <Sun />
            <span>Сегодня</span>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink
            to="/categories"
            styles={currentPath === '/categories' ? styles.activeLink : styles.unActiveLink}>
            <Stack />
            <span>Категории</span>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink
            to="/complited"
            styles={currentPath === '/complited' ? styles.activeLink : styles.unActiveLink}>
            <Circle />
            <span>Завершенные</span>
          </NavigationLink>
        </li>
      </ul>
    </aside>
  );
}

export default Nav;
