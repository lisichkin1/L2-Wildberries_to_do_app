import Layout from '../../components/Layout';
import stylesHome from './Home.module.css';
import styles from '../../styles/global.module.css';
import ItemForm from '../../components/ItemForm';
import Item from '../../components/Item';
import { useEffect, useState } from 'react';
function Home() {
  const storedTasks = localStorage.getItem('tasksData');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [addedTask, setAddedTask] = useState(false);
  const [itemDisplay, setItemDisplay] = useState(true);
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setEditedTask(null);
    setAddedTask(false);
    setItemDisplay(window.innerWidth < 1700 ? false : true);
  };
  const handleEditTaskClick = (task) => {
    setEditedTask(task);
    setSelectedTask(null);
    setAddedTask(false);
    setItemDisplay(window.innerWidth < 1700 ? false : true);
  };

  const handleClickAddTask = (res) => {
    setAddedTask(res);
    setSelectedTask(null);
    setEditedTask(null);
    setItemDisplay(window.innerWidth < 1700 ? false : true);
  };
  const handleClickCloseForm = () => {
    setSelectedTask(null);
    setEditedTask(null);
    setAddedTask(false);
    setItemDisplay(true);
  };
  const updateTasks = (newTasks) => {
    setTasks(newTasks);
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
    console.log(tasks);
  }, [tasks]);

  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        console.log('Permission result:', permission);
      });
    }
  };
  const setupNotification = (tasks) => {
    const currentTime = new Date().getTime();

    tasks.forEach((task) => {
      if (task.push) {
        const pushTime = new Date(task.push).getTime();

        if (pushTime <= currentTime) {
          console.log('время вышло');
          sendNotification(task.title);
        }
      }
    });
  };

  // Функция для отправки уведомления
  const sendNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('To Do App', {
        body: message,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('To Do App', {
            body: message,
          });
        }
      });
    }
  };

  // Ваш код для запроса разрешения на уведомления
  requestNotificationPermission();

  // Ваш код для рендеринга компонента и т.д.

  // Ваш useEffect для обновления задач
  useEffect(() => {
    requestNotificationPermission();
    if (tasks.length > 0) {
      setupNotification(tasks);
    }
  }, [tasks]);
  return (
    <Layout>
      <div className={stylesHome.container}>
        <div className={stylesHome.list__container}>
          <div className={stylesHome.list__subcontainer}>
            <h2 className={styles.title}>Все задачи</h2>
            {itemDisplay && (
              <Item
                tasks={tasks}
                setTasks={setTasks}
                onTaskClick={handleTaskClick}
                onEditTaskClick={handleEditTaskClick}
              />
            )}
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
          updateTasks={updateTasks}
        />
      </div>
    </Layout>
  );
}

export default Home;
