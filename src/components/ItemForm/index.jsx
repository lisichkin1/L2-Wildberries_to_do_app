import React, { useEffect, useState } from 'react';
import styles from '../../styles/global.module.css';
import stylesForm from './ItemForm.module.css';
import Calendar from '../../assets/icons/calendar.svg?react';
import Bell from '../../assets/icons/bell.svg?react';
import Plus from '../../assets/icons/plus.svg?react';
function ItemForm({ selectedTask, editedTask, addedTask, clickCloseForm }) {
  const storedTasks = localStorage.getItem('tasksData');
  const storedCategories = localStorage.getItem('categoriesData');
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [deadLine, setDeadLine] = useState('');
  const [push, setPush] = useState('');

  //функция геренрации ID. Это не является безопасным вариантом, из-за возможных возникновений коллизий. Но так как нет бека и билиотек, как альтернативное решение
  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };
  const handleSaveTask = (ev) => {
    ev.preventDefault();
    const id = generateUniqueId();
    const data = { id, title, description, date, deadLine, push, category, complited: false };
    setTasks((prevTasks) => [...prevTasks, data]);
    setCategory('');
    setTitle('');
    setDescription('');
    setDate('');
    setDeadLine('');
    setPush('');
  };
  const handleClickCloseForm = (ev) => {
    ev.preventDefault();
    clickCloseForm();
  };
  useEffect(() => {
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('tasksData', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  useEffect(() => {
    if (selectedTask) {
      // Обновляем поля формы при выборе задачи
      setCategory(selectedTask.category);
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDate(selectedTask.date);
      setDeadLine(selectedTask.deadLine);
      setPush(selectedTask.push);
    }
  }, [selectedTask]);
  useEffect(() => {
    if (editedTask) {
      // Обновляем поля формы при выборе задачи
      setCategory(editedTask.category);
      setTitle(editedTask.title);
      setDescription(editedTask.description);
      setDate(editedTask.date);
      setDeadLine(editedTask.deadLine);
      setPush(editedTask.push);
    }
  }, [editedTask]);
  return (
    (selectedTask || editedTask || addedTask) && (
      <form className={stylesForm.form} action="">
        <h2 className={styles.title}>{editedTask ? 'Редактировать задачу' : 'Детали задачи'}</h2>
        <button className={stylesForm.close} onClick={(ev) => handleClickCloseForm(ev)}>
          <Plus />
        </button>
        <div className={stylesForm.form__select}>
          <label className={stylesForm.label__small} htmlFor="category">
            Категория
          </label>
          <select
            className={stylesForm.select}
            name=""
            id="category"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}>
            <option value="">Нет категории</option>
            {categories.length > 0 &&
              categories.map((item, i) => (
                <option className={stylesForm.option} value={item} key={i}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className={stylesForm.form__title}>
          <label className={stylesForm.label__small} htmlFor="title">
            Название
          </label>
          <input
            className={
              stylesForm.title__input +
              (editedTask
                ? ` ${stylesForm.title__input__active}`
                : ` ${stylesForm.title__input__unactive}`)
            }
            type="text"
            id="title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div className={stylesForm.form__description}>
          <label className={stylesForm.label__small} htmlFor="description">
            Описание
          </label>
          <textarea
            className={
              stylesForm.description__input +
              (editedTask
                ? ` ${stylesForm.description__input__active}`
                : ` ${stylesForm.description__input__unactive}`)
            }
            name=""
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}></textarea>
        </div>
        <div
          className={
            stylesForm.form__options +
            (editedTask
              ? ` ${stylesForm.form__options__active}`
              : ` ${stylesForm.form__options__unactive}`)
          }>
          <div className={stylesForm.form__options__container}>
            <Calendar />
            <label className={stylesForm.label__normal} htmlFor="deadline">
              Дата
            </label>
          </div>
          <input
            className={stylesForm.date}
            type="datetime-local"
            name=""
            id="deadline"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
          />
        </div>
        <div
          className={
            stylesForm.form__options +
            (editedTask
              ? ` ${stylesForm.form__options__active}`
              : ` ${stylesForm.form__options__unactive}`)
          }>
          <div className={stylesForm.form__options__container}>
            <Calendar />
            <label className={stylesForm.label__normal} htmlFor="deadline">
              Дедлайн
            </label>
          </div>
          <input
            className={stylesForm.date}
            type="datetime-local"
            name=""
            id="deadline"
            value={deadLine}
            onChange={(ev) => setDeadLine(ev.target.value)}
          />
        </div>

        <div
          className={
            stylesForm.form__options +
            (editedTask
              ? ` ${stylesForm.form__options__active}`
              : ` ${stylesForm.form__options__unactive}`)
          }>
          <div className={stylesForm.form__options__container}>
            <Bell />
            <label className={stylesForm.label__normal} htmlFor="push">
              Уведомление
            </label>
          </div>
          <input
            className={stylesForm.date}
            type="datetime-local"
            name=""
            id="push"
            value={push}
            onChange={(ev) => setPush(ev.target.value)}
          />
        </div>
        <button onClick={(ev) => handleSaveTask(ev)} className={stylesForm.button}>
          Сохранить
        </button>
      </form>
    )
  );
}

export default ItemForm;
