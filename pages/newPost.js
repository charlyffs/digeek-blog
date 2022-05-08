import React from 'react'
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

const newPost = () => {
  return (
    <>
      <form action="" method="post">
        <div>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Título
          </h1>
          <input type="text" name="" id="" className="mx-auto" />
        </div>
        <hr className="my-5" />
        <div>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Resumen
          </h1>
          <input type="text" name="" id="" />
        </div>
        <hr className="my-5" />
        <div>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Cuerpo
          </h1>
          <Editor />
        </div>
        <hr className="my-5" />
        <div>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Tags
          </h1>
        </div>
        <button type="submit" className="mx-5">
          Postear
        </button>
      </form>
    </>
  )
}

export default newPost
