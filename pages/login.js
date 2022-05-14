import { useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { TextBox } from '@/components/TextInputs'
import Button from '@/components/Button'

function Login() {
  const cookies = new Cookies()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const router = useRouter()

  const handleSubmit = async (event) => {
    // Prevent page reload

    event.preventDefault()

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      })

      const data = await res.json()

      if (data.status === 400) {
        alert(data.msg)
        setIsSubmitted(false)
        //setErrorMessages({ name: data.field, msg: data.msg });
      } else if (data.status === 200) {
        setIsSubmitted(true)
        cookies.set('correo', data.usuario.correo, {
          path: '/',
          sameSite: true,
        })
        cookies.set('nombre', data.usuario.nombre, {
          path: '/',
          sameSite: true,
        })
        cookies.set('token', data.token, {
          path: '/',
          sameSite: true,
        })
        console.log(cookies.getAll())
        router.push('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="mx-32 rounded-lg border-2 px-16 py-8 drop-shadow-lg"
      >
        <h1 className="text-center font-bold">
          Ingresa con los datos de la cuenta que los administradores de la página te proporcionaron
        </h1>
        <div className="mt-5 mb-8">
          <label className="">Correo</label>
          <TextBox
            type="text"
            name="correo"
            placeholder="Introduce tu correo..."
            required
            onChange={(e) => setCorreo(e.target.value)}
          />
          <br />
          <br />
          <label className="">Contraseña</label>
          <TextBox
            type="password"
            name="contrasena"
            placeholder="Introduce tu contraseña..."
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <Button id="submit" caption="Submit" className="mx-auto flex" />
      </form>
    </>
  )
}

export default Login
