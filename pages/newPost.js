import React, { useState } from 'react'
import { TextBox, TextArea } from '@/components/TextInputs'
import Button from '@/components/Button'
import dynamic from 'next/dynamic'
import Cookies from 'universal-cookie'
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

const NewPost = () => {
  const cookies = new Cookies()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [text, setText] = useState('')
  const [titulo, setTitulo] = useState('')
  const [resumen, setResumen] = useState('')
  const [tags, setTags] = useState('')

  //let tagsList = [];

  const handleSubmit = async (event, tagsList) => {
    event.preventDefault()

    try {
      if (cookies.get('token') !== undefined || cookies.get('usuario') !== undefined) {
        const res = await fetch('http://localhost:8080/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-token': cookies.get('token'),
          },
          body: JSON.stringify({
            titulo,
            resumen,
            tags: tagsList,
            cuerpo: text,
          }),
        })

        const data = await res.json()

        if (data.status === 500) {
          alert(data.error)
        } else if (data.status === 200) {
          setIsSubmitted(true)
        }
      } else {
        alert('Se necesita iniciar sesion para poder publicar un articulo')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {isSubmitted ? (
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Se ha publicado el articulo
        </h1>
      ) : (
        <>
          <div>
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              Título
            </h1>
            <TextBox
              id="title"
              name="Title"
              placeholder="Introduce el título del artículo..."
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <hr className="my-5" />
          <div>
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              Resumen
            </h1>
            <TextArea
              id="summary"
              name="Summary"
              onChange={(e) => setResumen(e.target.value)}
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
              placeholder="Escribe la lista de tags, separados por espacios."
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <Button
            caption="Publicar"
            className="mx-auto mt-4 flex"
            onClick={(event) => {
              const tagsList = tags.trim().split(/\s+/)
              handleSubmit(event, tagsList)
            }}
          />
        </>
      )}
    </>
  )
}

export default NewPost
