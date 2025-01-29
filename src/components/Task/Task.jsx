import React, { useState } from 'react'
import TaskChangerButton from '../TaskChangerButton/TaskChangerButton'
import './Task.css'

export default function Task({ todo, onClickRemove, onClickComplete }) {

  return (
    <li className='task-list_item'>
      <p className={todo.done === true ? 'task-text task-text__completed' : 'task-text'}>{todo.text}</p>
      <div className="task-buttons">
        <TaskChangerButton onClick={() => onClickComplete(todo.id)} className='button button_change-button'>Завершить</TaskChangerButton>
        <TaskChangerButton onClick={() => onClickRemove(todo.id)} className='button button_done-button'>Удалить</TaskChangerButton>
      </div>
    </li>
  )
}
