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
  const [selectSort, setSelectSort] = useState('standart');
  const [sortedTasks, setSortedTasks] = useState([]);
  const handleComplited = (task) => {
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
  const sortTasksDateAsc = () => {
    const sortedTasksAsc = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    setSortedTasks(sortedTasksAsc);
  };

  const sortTasksDateDesc = () => {
    const sortedTasksDesc = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedTasks(sortedTasksDesc);
  };

  const sortTasksDeadlineAsc = () => {
    const sortedTasksAsc = tasks.sort((a, b) => new Date(a.deadLine) - new Date(b.deadLine));
    setSortedTasks(sortedTasksAsc);
  };

  const sortTasksDeadlineDesc = () => {
    const sortedTasksDesc = tasks.sort((a, b) => new Date(b.deadLine) - new Date(a.deadLine));
    setSortedTasks(sortedTasksDesc);
  };

  const selectSortTasks = (ev) => {
    setSelectSort(ev);
    switch (ev) {
      case 'DateAsc':
        sortTasksDateAsc();
        break;
      case 'DateDesc':
        sortTasksDateDesc();
        break;
      case 'DeadlineAsc':
        sortTasksDeadlineAsc();
        break;
      case 'DeadlineDesc':
        sortTasksDeadlineDesc();
        break;
      case 'standart':
        setSortedTasks([...tasks]);
        break;
      default:
        alert('Нет таких значений');
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
    setSortedTasks(tasks);
  }, [tasks, setSortedTasks]);

  return (
    <div>
      <select
        className={itemStyles.sort}
        name=""
        id=""
        value={selectSort}
        onChange={(ev) => selectSortTasks(ev.target.value)}>
        <option value="standart">Стандарт</option>
        <option value="DateAsc">По возрастанию даты</option>
        <option value="DateDesc">По убыванию даты</option>
        <option value="DeadlineAsc">По возрастанию дедлайна</option>
        <option value="DeadlineDesc">По убыванию дедлайна</option>
      </select>
      {datesComplited.length > 0 &&
        datesComplited.map((date) => (
          <div key={date}>
            <h3 className={styles.subtitle}>{formatDate(date)}</h3>
            <ul className={styles.list}>
              {sortedTasks.length > 0 &&
                sortedTasks
                  .filter((task) => date === task.date && !task.complited)
                  .map((task) => (
                    <li key={task.id} className={styles.item}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        defaultChecked={task?.complited}
                        onChange={() => handleComplited(task)}
                      />
                      <div
                        className={itemStyles.description}
                        onClick={() => handleTaskItemClick(task)}>
                        <span className={itemStyles.item__title}>{task.title}</span>
                        <div className={itemStyles.description__container}>
                          {task.deadLine && (
                            <div className={itemStyles.text__container}>
                              <Clock />
                              <span className={itemStyles.item__text}>
                                {formatTimeDeadline(task.deadLine)}
                              </span>
                            </div>
                          )}
                          {task.deadLine && (
                            <div className={itemStyles.text__container}>
                              <Calendar />
                              <span className={itemStyles.item__text}>
                                {formatDateDeadline(task.deadLine)}
                              </span>
                            </div>
                          )}
                          {task.category && (
                            <div className={itemStyles.text__container}>
                              <Stack />
                              <span className={itemStyles.item__text}>{task.category}</span>
                            </div>
                          )}
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
          </div>
        ))}
      {sortedTasks.length > 0 && (
        <h2 className={styles.title + ' ' + itemStyles.title__home}>Завершённые задачи</h2>
      )}
      {dates.length > 0 &&
        dates.map((date) => (
          <div key={date}>
            <ul className={styles.list}>
              {sortedTasks.length > 0 &&
                sortedTasks
                  .filter((task) => date === task.date && task.complited)
                  .map((task) => (
                    <li key={task.id} className={styles.item + ' ' + itemStyles.overlayContent}>
                      <div
                        className={itemStyles.overlay}
                        onClick={() => handleTaskItemClick(task)}></div>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        defaultChecked={task?.complited}
                        onChange={() => handleComplited(task)}
                      />
                      <div className={itemStyles.description}>
                        <span
                          className={
                            itemStyles.item__title + ' ' + itemStyles.item__title__complited
                          }>
                          {task.title}
                        </span>
                        <div className={itemStyles.description__container}>
                          {task.deadLine && (
                            <div className={itemStyles.text__container}>
                              <Clock />
                              <span className={itemStyles.item__text}>
                                {formatTimeDeadline(task.deadLine)}
                              </span>
                            </div>
                          )}
                          {task.deadLine && (
                            <div className={itemStyles.text__container}>
                              <Calendar />
                              <span className={itemStyles.item__text}>
                                {formatDateDeadline(task.deadLine)}
                              </span>
                            </div>
                          )}
                          {task.category && (
                            <div className={itemStyles.text__container}>
                              <Stack />
                              <span className={itemStyles.item__text}>{task.category}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button className={styles.button} onClick={() => handleDeleteTask(task.id)}>
                        <Trash />
                      </button>
                    </li>
                  ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default Item;
