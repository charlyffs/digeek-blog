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
        className="rounded-lg border-2 px-16 py-8 drop-shadow-lg md:mx-20 lg:mx-32"
      >
        <h1 className="text-center font-bold">
          El inicio de sesión es solo para administradores, si no es tu caso, puedes volver a seguir
          leyendo más artículos.
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
            password
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
