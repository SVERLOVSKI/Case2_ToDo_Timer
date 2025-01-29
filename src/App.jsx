import { useState } from 'react'
import Form from './components/Form/Form'
import InfroBar from './components/InformationBar/InfroBar'
import Task from './components/Task/Task'
import Timer from './components/Timer/Timer'
import './App.css'
import ThemeIcon from './assets/BxsMoon.svg'

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');

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
