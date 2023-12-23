import React, { useContext, useEffect } from 'react';
import styles from './Nav.module.css';
import NavigationLink from './NavigationLink';
import { RouterContext } from '../../Router';
import Calendar from '../../assets/icons/calendar.svg?react';
import Sun from '../../assets/icons/sun.svg?react';
import List from '../../assets/icons/list.svg?react';
import Stack from '../../assets/icons/stack.svg?react';
import Circle from '../../assets/icons/circle.svg?react';
import Bars from '../../assets/icons/bars.svg?react';
function Nav({ displayMenuMobile, setDisplayMenuMobile }) {
  const { currentPath } = useContext(RouterContext);
  // Функция для обработки изменения размера окна
  const handleResize = () => {
    // Установите состояние в false, если ширина экрана меньше или равна 620
    setDisplayMenuMobile(window.innerWidth > 620);
  };

  // Используйте useEffect для подписки на событие изменения размера окна
  useEffect(() => {
    // Вызовите handleResize при монтировании компонента
    handleResize();

    // Подпишитесь на событие изменения размера окна
    window.addEventListener('resize', handleResize);

    // Очистите подписку при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <aside className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.logo__container}>
          <Calendar />
          <h1>To Do App</h1>
        </div>
        <button
          className={styles.menu__mobile}
          onClick={() => setDisplayMenuMobile((prevMenu) => !prevMenu)}>
          <Bars />
        </button>
      </div>
      {displayMenuMobile && (
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
      )}
    </aside>
  );
}

export default Nav;
