import React, { useEffect, useState } from 'react';
import styles from '../../styles/global.module.css';
import stylesForm from './ItemForm.module.css';
import Calendar from '../../assets/icons/calendar.svg?react';
import Bell from '../../assets/icons/bell.svg?react';
import Plus from '../../assets/icons/plus.svg?react';
function ItemForm({ selectedTask, editedTask, addedTask, clickCloseForm, updateTasks }) {
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
  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');
  //функция геренрации ID. Это не является безопасным вариантом, из-за возможных возникновений коллизий. Но так как нет бека и билиотек, как альтернативное решение
  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };
  const validationForm = () => {
    let validation = true;
    if (!title.trim()) {
      setTitleError('Поле должно быть заполнено');
      validation = false;
    }
    if (!date.trim()) {
      setDateError('Поле должно быть заполнено');
      validation = false;
    }
    return validation;
  };
  const handleSaveTask = (ev) => {
    ev.preventDefault();
    if (!validationForm()) {
      return;
    }

    const id = generateUniqueId();
    const data = { id, title, description, date, deadLine, push, category, complited: false };

    if (editedTask) {
      // Если editedTask существует, значит, это редактирование существующей задачи
      updateTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editedTask.id ? { ...task, ...data } : task)),
      );
    } else {
      // В противном случае, это создание новой задачи
      updateTasks((prevTasks) => [...prevTasks, data]);
    }

    setCategory('');
    setTitle('');
    setDescription('');
    setDate('');
    setDeadLine('');
    setPush('');
    clickCloseForm();
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
    if (selectedTask || editedTask) {
      setCategory(selectedTask?.category || editedTask?.category || '');
      setTitle(selectedTask?.title || editedTask?.title || '');
      setDescription(selectedTask?.description || editedTask?.description || '');
      setDate(selectedTask?.date || editedTask?.date || '');
      setDeadLine(selectedTask?.deadLine || editedTask?.deadLine || '');
      setPush(selectedTask?.push || editedTask?.push || '');
    }
  }, [selectedTask, editedTask]);
  useEffect(() => {
    if (addedTask) {
      setCategory('');
      setTitle('');
      setDescription('');
      setDate('');
      setDeadLine('');
      setPush('');
    }
  }, [addedTask]);
  return (
    (selectedTask || editedTask || addedTask) && (
      <form className={stylesForm.form} action="">
        <div className={stylesForm.container}>
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
                (editedTask || addedTask
                  ? ` ${stylesForm.title__input__active}`
                  : ` ${stylesForm.title__input__unactive}`)
              }
              type="text"
              id="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            {titleError && <p className={stylesForm.error}>{titleError}</p>}
          </div>
          <div className={stylesForm.form__description}>
            <label className={stylesForm.label__small} htmlFor="description">
              Описание
            </label>
            <textarea
              className={
                stylesForm.description__input +
                (editedTask || addedTask
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
          <div>
            <div
              className={
                stylesForm.form__options +
                (editedTask || addedTask
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
            {dateError && <p className={stylesForm.error}>{dateError}</p>}
          </div>
          <div
            className={
              stylesForm.form__options +
              (editedTask || addedTask
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
              (editedTask || addedTask
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
          {(editedTask || addedTask) && (
            <button onClick={(ev) => handleSaveTask(ev)} className={stylesForm.button}>
              Сохранить
            </button>
          )}
        </div>
      </form>
    )
  );
}

export default ItemForm;
