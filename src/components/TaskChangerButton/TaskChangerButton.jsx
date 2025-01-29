import React, { Children } from 'react'

export default function TaskChangerButton({children, className, onClick}) {
  return (
    <button onClick={onClick} className={className}>{children}</button>
  )
}
