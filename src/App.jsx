import { useEffect, useState } from 'react'
import Form from './components/Form/Form'
import InfroBar from './components/InformationBar/InfroBar'
import Task from './components/Task/Task'
import Timer from './components/Timer/Timer'
import './App.css'
import ThemeIcon from './assets/BxsMoon.svg'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Сохраняем текущее состояние темы в localStorage
    localStorage.setItem('theme', theme);
  }, [theme])

  function addTask(value) {
    if (value) {
      setTodos(
        [
          ...todos,
          {
            id: Date.now(),
            text: value,
            done: false,
          }
        ]
      );
    } else {
      alert('Введи текст')
    };
  };

  function removeTask(id) {
    setTodos(
      [
        ...todos.filter(todo => todo.id !== id)
      ]
    );

    let storedItems = JSON.parse(localStorage.getItem('todos'));
    const itemIndex = storedItems.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
      // Переключаем значение done
      storedItems[itemIndex].done = !storedItems[itemIndex].done;

      // Если значение стало true, удаляем элемент из массива и LocalStorage
      if (storedItems[itemIndex].done) {
        storedItems.splice(itemIndex, 1); // Удаляем элемент из массива
      }

      // Обновляем LocalStorage с новым массивом
      localStorage.setItem('todos', JSON.stringify(storedItems));

      console.log(`Элемент с ID ${id} был обновлён. Текущее состояние:`, storedItems);
    } else {
      console.log(`Элемент с ID ${id} не найден.`);
    }
  };

  function completeTask(id) {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : { ...todo }
      ),
    ]);
  };

  function changeTheme() {
    if (theme === 'light') {
      setTheme('dark');
      document.body.classList.add('dark')
    } else {
      setTheme('light');
      document.body.classList.remove('dark')
    }
  }

  return (
    <>
      <div className="main-wrapper">
        <main className="main-content">
          <button className='theme-switcher-button' onClick={changeTheme}><img className='theme-swithcer-icon' src={ThemeIcon} alt="" /></button>
          <Timer />
          <div className="todo-wrapper">
            <h1 className="service-name">Todo List</h1>
            <InfroBar
            todos={todos}
            />
            <Form
              onClickAdd={addTask} />
            <ul className="tasks-list">
              {todos.map((todo) => (
                <Task
                  todo={todo}
                  key={todo.id}
                  onClickRemove={removeTask}
                  onClickComplete={completeTask} />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}

export default App