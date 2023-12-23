import Layout from '../../components/Layout';
import stylesComplited from './Complited.module.css';
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
  const [complitedTasksState, setComplitedTasksState] = useState([]);
  const [isComplitedCheck, setIsComplitedCheck] = useState(false);
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
    const todayTasks = tasks.filter((task) => task.complited === true);
    setComplitedTasksState(todayTasks);
  }, [tasks]);
  return (
    <Layout>
      <div className={stylesComplited.container}>
        <div className={stylesComplited.list__container}>
          <div className={stylesComplited.list__subcontainer}>
            <h2 className={styles.title}>Завершенные задачи</h2>
            <Item
              tasks={complitedTasksState}
              setTasks={setTasks}
              onTaskClick={handleTaskClick}
              onEditTaskClick={handleEditTaskClick}
            />
          </div>

          <button className={stylesComplited.button} onClick={() => handleClickAddTask(true)}>
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
