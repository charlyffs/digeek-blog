import React from 'react'
import Editor from 'rich-markdown-editor'

const newPost = () => {
  return (
    <>
      <Editor defaultValue="Hello" id="editor" onFocus={console.log(this.value)} />
    </>
  )
}

export default newPost
