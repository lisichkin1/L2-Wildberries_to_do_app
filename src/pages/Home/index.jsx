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
  if (!('serviceWorker' in navigator)) {
    // Браузер не поддерживает сервис-воркеры.
    console.log('не работает');
  }

  if (!('PushManager' in window)) {
    // Браузер не поддерживает push-уведомления.
    console.log('не работает');
  }
  if ('serviceWorker' in navigator) {
    // Браузер не поддерживает сервис-воркеры.
    console.log('работает 1');
  }

  if ('PushManager' in window) {
    // Браузер не поддерживает push-уведомления.
    console.log('работает 2');
  }
  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        type: 'module',
      });
      console.log('Service Worker зарегистрирован:', registration);

      // Если установка push-уведомлений поддерживается
      if ('PushManager' in window) {
        console.log('Push поддерживается');
        await requestNotificationPermission();
      }
    } catch (error) {
      console.error('Ошибка при регистрации сервис-воркера:', error);
    }
  }
  async function requestNotificationPermission() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const permissionResult = await Notification.requestPermission();
        console.log('Permission result:', permissionResult);

        if (permissionResult === 'granted') {
          console.log('Разрешение на уведомления получено.');
        } else {
          console.warn('Разрешение на уведомления не получено.');
        }
      } catch (error) {
        console.error('Ошибка при регистрации сервис-воркера:', error);
      }
    } else {
      console.warn('Браузер не поддерживает сервис-воркеры или push-уведомления.');
    }
  }
  function setupNotification(tasks) {
    tasks.forEach((task) => {
      if (task.push) {
        const pushTime = new Date(task.push).getTime();
        const currentTime = new Date().getTime();

        if (pushTime > currentTime) {
          console.log('время вышло');
          sendNotification(task.title);
        }
      }
    });
  }

  // Функция для отправки уведомления
  function sendNotification(message) {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.showNotification('To Do App', {
            body: message,
          });
        })
        .catch((error) => {
          console.error('Ошибка при отправке уведомления:', error);
        });
    }
  }

  // Ваш код для запроса разрешения на уведомления
  requestNotificationPermission();

  // Ваш код для рендеринга компонента и т.д.

  // Ваш useEffect для обновления задач
  useEffect(() => {
    registerServiceWorker(); // Регистрируем сервис-воркер при монтировании компонента

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
