import React from 'react'
import './InfoBar.css'

export default function InfroBar({ todos }) {

  return (
    <section className="info-bar">
        <p className="tasks-counter">Текущих задач: {todos.length}</p>
    </section>
  )
}
