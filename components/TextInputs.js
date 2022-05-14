import React from 'react'

const style =
  'appearance-none border-0 bg-gray-200 dark:bg-slate-600 focus:border-sky-500 text-neutral-900 dark:text-gray-50 placeholder-gray-current dark:placeholder-gray-400 appearance-none rounded w-full py-2 px-4 leading-tight focus:outline-none'

export const TextBox = (props) => {
  return (
    <input
      type={props.password ? 'password' : 'text'}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      required={props.required}
      onChange={props.onChange}
      className={style}
    />
  )
}

export const TextArea = (props) => {
  return (
    <textarea
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      className={style + ' h-32'}
    />
  )
}
