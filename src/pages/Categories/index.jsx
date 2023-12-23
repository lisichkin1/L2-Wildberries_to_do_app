import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/global.module.css';
import stylesCategory from './Categories.module.css';
import Plus from '../../assets/icons/plus.svg?react';
import Pencil from '../../assets/icons/pencil.svg?react';
import Trash from '../../assets/icons/trash.svg?react';
import Check from '../../assets/icons/check.svg?react';
function Categories() {
  const storedCategories = localStorage.getItem('categoriesData');

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');

  //функция создания и редкатирования категории
  const handleAddCategory = () => {
    const isCategoryExist = categories.includes(categoryName);
    //Валидируем поле, чтобы не добавить такую же категорию
    if (isCategoryExist) {
      alert('Категория уже существует');
    } else {
      //Если в стейте есть редактируемая категория, то меняем имя, иначе создаём её
      if (editedCategory) {
        setCategories((prevCategories) =>
          prevCategories.map((category) => (category === editedCategory ? categoryName : category)),
        );
        setEditedCategory('');
      } else {
        setCategories((prevCategories) => [...prevCategories, categoryName]);
      }
      setCategoryName('');
    }
  };
  const handleKeyDown = (event) => {
    // обрабатываем только клавишу Enter
    if (event.key === 'Enter') {
      handleAddCategory();
    }
  };
  //функция редактирования категории
  const handleEditCategory = (category) => {
    setEditedCategory(category);
    setCategoryName(category);
  };

  //функция удаления категории
  const handleDeleteCategory = (categoryIndex) => {
    setCategories((prevCategories) => prevCategories.filter((_, index) => index !== categoryIndex));
  };

  //Записываем в сейт данные из localStorage при загрузке страницы
  useEffect(() => {
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  //записываем данные в localStorage, при изменении categories
  useEffect(() => {
    localStorage.setItem('categoriesData', JSON.stringify(categories));
  }, [categories]);

  return (
    <Layout>
      <div className={stylesCategory.container}>
        <h2 className={styles.title}>Категории</h2>
        <div className={stylesCategory.form}>
          <input
            className={stylesCategory.input}
            type="text"
            name=""
            id=""
            value={categoryName}
            onChange={(ev) => setCategoryName(ev.target.value)}
            onKeyDown={(ev) => handleKeyDown(ev)}
          />

          <button className={styles.button} onClick={handleAddCategory}>
            {editedCategory ? <Check /> : <Plus />}
          </button>
        </div>
        <ul className={styles.list}>
          {categories.length > 0 &&
            categories.map((item, index) => (
              <li key={index} className={styles.item + ' ' + stylesCategory.item}>
                <span>{item}</span>
                <button onClick={() => handleEditCategory(item)} className={styles.button}>
                  <Pencil />
                </button>
                <button onClick={() => handleDeleteCategory(index)} className={styles.button}>
                  <Trash />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Categories;
