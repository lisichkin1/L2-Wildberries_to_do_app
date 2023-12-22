import Layout from '../../components/Layout';
import stylesHome from './Home.module.css';
import styles from '../../styles/global.module.css';
import ItemForm from '../../components/ItemForm';
import Item from '../../components/Item';
import { useState } from 'react';
function Home() {
  const storedTasks = localStorage.getItem('tasksData');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [addedTask, setAddedTask] = useState(false);
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
  return (
    <Layout>
      <div className={stylesHome.container}>
        <div className={stylesHome.list__container}>
          <div className={stylesHome.list__subcontainer}>
            <h2 className={styles.title}>Все задачи</h2>
            <Item onTaskClick={handleTaskClick} onEditTaskClick={handleEditTaskClick} />
          </div>

          <button className={stylesHome.button} onClick={() => handleClickAddTask(true)}>
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

export default Home;
