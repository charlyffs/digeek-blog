import React from 'react'

const Button = (props) => {
  return (
    <button
      type="submit"
      id={props.id}
      onClick={props.onClick}
      className={
        'rounded-lg bg-[#3DC0CB] py-1 px-3 font-bold text-gray-50 duration-300 ease-linear hover:bg-[#21AAB6] ' +
        props.className
      }
    >
      {props.caption ? props.caption : 'Click me'}
    </button>
  )
}

export default Button
