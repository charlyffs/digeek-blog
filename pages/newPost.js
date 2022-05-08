import React from 'react'
import {useRemirror} from '@remirror/react'
import {BoldExtension, ItalicsExtension} from 'remirror/extensions'

const remirrorJsonFromStorage = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Hello world' }] },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Hello ' },
        { type: 'text', marks: [{ type: 'italic' }], text: 'word' },
      ],
    },
  ],
}

const { manager, state } = useRemirror({
  extensions: () => [
    new BoldExtension(),
    new ItalicExtension(),
    new CalloutExtension({ defaultType: 'warn' }),
  ],

  content: remirrorJsonFromStorage,
});

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
          <Remirror manager={manager} initialContent={state} />
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
