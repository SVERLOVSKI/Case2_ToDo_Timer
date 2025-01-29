import React, { useState } from 'react'
import './Form.css'

export default function Form({ onClickAdd }) {
  const [value, setValue] = useState('');

  function handleSumbit(e) {
    e.preventDefault();
    onClickAdd(value);
    setValue('');
  }

  function inputValueChanger(e) {
    setValue(e.target.value)
  }

  return (
    <form className='task-form' onSubmit={handleSumbit}>
        <input onChange={inputValueChanger} type="text" placeholder='Введите текст задачи...' className='task-input' value={value}/>
        <input type="submit" value='Добавить задачу' className={value == '' ? 'submit-button submit-button__disabled' : 'submit-button'} disabled={value == ''}/>
    </form>
  )
}
