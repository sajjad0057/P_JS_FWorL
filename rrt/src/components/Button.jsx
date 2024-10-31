import React from 'react'

const Button = ({ children, type, handler }) => {

  const style = 
    type === "danger" 
      ? "bg-red-400 text-white px-3 py-2 rounded shadow"
      : "bg-blue-400 text-white px-3 py-2 rounded shadow"

  return (
    <button className= {style} onClick={handler}>
      {children}
    </button>
  )
}

export default Button