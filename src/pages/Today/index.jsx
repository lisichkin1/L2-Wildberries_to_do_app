import Layout from '../../components/Layout';
import stylesToday from './Today.module.css';
import styles from '../../styles/global.module.css';
import ItemForm from '../../components/ItemForm';
import Item from '../../components/Item';
import { useEffect, useState } from 'react';
function Today() {
  const storedTasks = localStorage.getItem('tasksData');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [addedTask, setAddedTask] = useState(false);
  const [todayTasksState, setTodayTasksState] = useState([]);
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setEditedTask(null);
  };
  const handleEditTaskClick = (task) => {
    setEditedTask(task);
    setSelectedTask(null);
  };

  const handleClickAddTask = (res) => {
    setAddedTask(res);
    setSelectedTask(null);
    setEditedTask(null);
  };
  const handleClickCloseForm = () => {
    setSelectedTask(null);
    setEditedTask(null);
    setAddedTask(false);
  };
  useEffect(() => {
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('tasksData', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const todayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      const today = new Date();

      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      );
    });

    // Выводим отфильтрованные задачи в консоль (можете заменить этот код своей логикой)
    setTodayTasksState(todayTasks);
  }, [tasks]);
  return (
    <Layout>
      <div className={stylesToday.container}>
        <div className={stylesToday.list__container}>
          <div className={stylesToday.list__subcontainer}>
            <h2 className={styles.title}>Задачи на сегодня</h2>
            <Item
              tasks={todayTasksState}
              setTasks={setTasks}
              onTaskClick={handleTaskClick}
              onEditTaskClick={handleEditTaskClick}
            />
          </div>

          <button className={stylesToday.button} onClick={() => handleClickAddTask(true)}>
            Добавить задачу
          </button>
        </div>
        <ItemForm
          selectedTask={selectedTask}
          editedTask={editedTask}
          addedTask={addedTask}
          clickCloseForm={handleClickCloseForm}
        />
      </div>
    </Layout>
  );
}

export default Today;
