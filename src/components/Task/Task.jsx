import React, { useState } from 'react'
import TaskChangerButton from '../TaskChangerButton/TaskChangerButton'
import './Task.css'
import DoneIcon from './imgs/done.svg'
import DeleteIcon from './imgs/delete.svg'

export default function Task({ todo, onClickRemove, onClickComplete }) {

  return (
    <li className='task-list_item'>
      <p className={todo.done === true ? 'task-text task-text__completed' : 'task-text'}>{todo.text}</p>
      <div className="task-buttons">
        <TaskChangerButton onClick={() => onClickComplete(todo.id)} className='button button_change-button'><img src={DoneIcon} alt="" width={20} /><p>Завершить</p></TaskChangerButton>
        <TaskChangerButton onClick={() => onClickRemove(todo.id)} className='button button_done-button'><img src={DeleteIcon} alt="" width={20} /><p>Удалить</p></TaskChangerButton>
      </div>
    </li>
  )
}
