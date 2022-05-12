import React from 'react'
import { TextBox, TextArea } from '@/components/TextInputs'
import Button from '@/components/Button'
import dynamic from 'next/dynamic'
const DualEditor = dynamic(() => import('@/components/Editor'), { ssr: false })

// const Editor = dynamic(() => import('@/components/Editor.js'), { ssr: false })

const newPost = () => {
  return (
    <>
      <form action="" method="post">
        <div>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Título
          </h1>
          <TextBox password placeholder="Introduce el título del artículo..." />
        </div>
        <hr className="my-5" />
        <div>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Resumen
          </h1>
          <TextArea placeholder="Introduce una breve descripción del artículo..." />
        </div>
        <hr className="my-5" />
        <div>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Cuerpo
          </h1>
          <DualEditor />
        </div>
        <hr className="my-5" />
        <div>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Tags
          </h1>
        </div>
        <Button />
      </form>
    </>
  )
}

export default newPost
