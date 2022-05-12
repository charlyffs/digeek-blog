import React from 'react'

const Button = (props) => {
  return (
    <button
      type="submit"
      onClick={props.onClick}
      className="float-right rounded-lg bg-sky-500 py-1 px-2 font-bold text-gray-50 hover:bg-sky-600"
    >
      {props.caption ? props.caption : 'Click me'}
    </button>
  )
}

export default Button
