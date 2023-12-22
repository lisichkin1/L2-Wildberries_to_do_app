import React, { useEffect, useState } from 'react';
import Clock from '../../assets/icons/clock.svg?react';
import Calendar from '../../assets/icons/calendar.svg?react';
import Stack from '../../assets/icons/stack.svg?react';
import Pencil from '../../assets/icons/pencil.svg?react';
import Trash from '../../assets/icons/trash.svg?react';
import styles from '../../styles/global.module.css';
import itemStyles from './Item.module.css';
import { formatDate, formatDateDeadline, formatTimeDeadline } from '../../utils/date';
function Item({ tasks, setTasks, onTaskClick, onEditTaskClick }) {
  const [isComplited, setIsComplited] = useState([]);

  const handleComplited = (task) => {
    setIsComplited(tasks.filter((item) => item.id === task.id));
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === task.id ? { ...item, complited: !item.complited } : item,
      ),
    );
  };
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  const handleTaskItemClick = (task) => {
    if (onTaskClick) {
      onTaskClick(task);
    }
  };
  const handleTaskEditItemClick = (task) => {
    if (onEditTaskClick) {
      onEditTaskClick(task);
    }
  };
  let datesComplited = [];
  tasks.length > 0 &&
    tasks.forEach((element) => {
      if (!datesComplited.includes(element.date) && !element.complited) {
        datesComplited.push(element.date);
      }
    });
  let dates = [];
  tasks.length > 0 &&
    tasks?.forEach((element) => {
      if (!dates.includes(element.date)) {
        dates.push(element.date);
      }
    });

  useEffect(() => {
    console.log(isComplited);
  }, [isComplited]);
  console.log(dates);
  return (
    <>
      {datesComplited.length > 0 &&
        datesComplited.map((date) => (
          <>
            <h3 className={styles.subtitle}>{formatDate(date)}</h3>
            <ul className={styles.list}>
              {tasks.length > 0 &&
                tasks
                  .filter((task) => date === task.date && !task.complited)
                  .map((task) => (
                    <li className={styles.item}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={task?.complited}
                        onClick={() => handleComplited(task)}
                      />
                      <div
                        className={itemStyles.description}
                        onClick={() => handleTaskItemClick(task)}>
                        <span className={itemStyles.item__title}>{task.title}</span>
                        <div className={itemStyles.description__container}>
                          <div className={itemStyles.text__container}>
                            <Clock />
                            <span className={itemStyles.item__text}>
                              {formatTimeDeadline(task.deadLine)}
                            </span>
                          </div>
                          <div className={itemStyles.text__container}>
                            <Calendar />
                            <span className={itemStyles.item__text}>
                              {formatDateDeadline(task.deadLine)}
                            </span>
                          </div>
                          <div className={itemStyles.text__container}>
                            <Stack />
                            <span className={itemStyles.item__text}>{task.category}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        className={styles.button}
                        onClick={() => handleTaskEditItemClick(task)}>
                        <Pencil />
                      </button>
                      <button className={styles.button} onClick={() => handleDeleteTask(task.id)}>
                        <Trash />
                      </button>
                    </li>
                  ))}
            </ul>
          </>
        ))}
      <h2 className={styles.title + ' ' + itemStyles.title__home}>Завершённые задачи</h2>
      {dates.length > 0 &&
        dates.map((date) => (
          <>
            <ul className={styles.list}>
              {tasks.length > 0 &&
                tasks
                  .filter((task) => date === task.date && task.complited)
                  .map((task) => (
                    <li className={styles.item + ' ' + itemStyles.overlayContent}>
                      <div className={itemStyles.overlay}></div>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={task?.complited}
                        onClick={() => handleComplited(task)}
                      />
                      <div
                        className={itemStyles.description}
                        onClick={() => handleTaskItemClick(task)}>
                        <span
                          className={
                            itemStyles.item__title + ' ' + itemStyles.item__title__complited
                          }>
                          {task.title}
                        </span>
                        <div className={itemStyles.description__container}>
                          <div className={itemStyles.text__container}>
                            <Clock />
                            <span className={itemStyles.item__text}>
                              {formatTimeDeadline(task.deadLine)}
                            </span>
                          </div>
                          <div className={itemStyles.text__container}>
                            <Calendar />
                            <span className={itemStyles.item__text}>
                              {formatDateDeadline(task.deadLine)}
                            </span>
                          </div>
                          <div className={itemStyles.text__container}>
                            <Stack />
                            <span className={itemStyles.item__text}>{task.category}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </>
        ))}
    </>
  );
}

export default Item;
