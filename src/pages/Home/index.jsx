import Layout from '../../components/Layout';
import styles from './Home.module.css';
import Clock from '../../assets/icons/clock.svg?react';
import Calendar from '../../assets/icons/calendar.svg?react';
import Stack from '../../assets/icons/stack.svg?react';
import Pencil from '../../assets/icons/pencil.svg?react';
import Trash from '../../assets/icons/trash.svg?react';
function Home() {
  return (
    <Layout>
      <h2 className={styles.title}>Все задачи</h2>
      <h3 className={styles.subtitle}>Среда, 20 декабря</h3>
      <ul className={styles.list}>
        <li className={styles.item}>
          <input type="checkbox" name="" id="" />
          <div className={styles.description}>
            <span className={styles.item__title}>Митинг с заказчиком</span>
            <div className={styles.description__container}>
              <div className={styles.text__container}>
                <Clock />
                <span className={styles.item__text}>07:00</span>
              </div>
              <div className={styles.text__container}>
                <Calendar />
                <span className={styles.item__text}>21 дек</span>
              </div>
              <div className={styles.text__container}>
                <Stack />
                <span className={styles.item__text}>учеба</span>
              </div>
            </div>
          </div>
          <button className={styles.button}>
            <Pencil />
          </button>
          <button className={styles.button}>
            <Trash />
          </button>
        </li>
        <li className={styles.item}>
          <input type="checkbox" name="" id="" />
          <div className={styles.description}>
            <span className={styles.item__title}>Митинг с заказчиком</span>
            <div className={styles.description__container}>
              <div className={styles.text__container}>
                <Clock />

                <span className={styles.item__text}>07:00</span>
              </div>
              <div className={styles.text__container}>
                <Calendar />
                <span className={styles.item__text}>21 дек</span>
              </div>
              <div className={styles.text__container}>
                {' '}
                <Stack />
                <span className={styles.item__text}>учеба</span>
              </div>
            </div>
          </div>
          <button className={styles.button}>
            <Pencil />
          </button>
          <button className={styles.button}>
            <Trash />
          </button>
        </li>
        <li className={styles.item}>
          <input type="checkbox" name="" id="" />
          <div className={styles.description}>
            <span className={styles.item__title}>Митинг с заказчиком</span>
            <div className={styles.description__container}>
              <div className={styles.text__container}>
                <Clock />
                <span className={styles.item__text}>07:00</span>
              </div>
              <div className={styles.text__container}>
                <Calendar />
                <span className={styles.item__text}>21 дек</span>
              </div>
              <div className={styles.text__container}>
                <Stack />
                <span className={styles.item__text}>учеба</span>
              </div>
            </div>
          </div>
          <button className={styles.button}>
            <Pencil />
          </button>
          <button className={styles.button}>
            <Trash />
          </button>
        </li>
      </ul>
    </Layout>
  );
}

export default Home;
