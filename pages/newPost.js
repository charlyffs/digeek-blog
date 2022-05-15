import React, { useState } from 'react'
import { TextBox, TextArea } from '@/components/TextInputs'
import Button from '@/components/Button'
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

const NewPost = () => {
  const [text, setText] = useState('')

  return (
    <>
      <div>
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Título
        </h1>
        <TextBox id="title" name="Title" placeholder="Introduce el título del artículo..." />
      </div>
      <hr className="my-5" />
      <div>
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Resumen
        </h1>
        <TextArea
          id="summary"
          name="Summary"
          placeholder="Introduce una breve descripción del artículo..."
        />
      </div>
      <hr className="my-5" />
      <div>
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Cuerpo
        </h1>
        <Editor setText={setText} />
      </div>
      <hr className="my-5" />
      <div>
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Tags
        </h1>
        <TextBox
          id="tags"
          name="Tags"
          placeholder="Escribe la lista de tags, separados por coma."
        />
      </div>
      <Button
        caption="Publicar"
        className="mx-auto mt-4 flex"
        onClick={() => {
          console.log(text)
        }}
      />
    </>
  )
}

export default NewPost
