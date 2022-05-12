import { useState } from 'react'
import styles from '../css/login-form.module.css'
import { useRouter } from 'next/router'

function Login() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const router = useRouter()

  const handleSubmit = async (event) => {
    // Prevent page reload

    event.preventDefault()

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
      document.cookie = `correo=${data.usuario.correo}`
      document.cookie = `token=${data.token}`
      document.cookie = `usuario=${data.usuario.nombre}`
      router.push('/')
    }
  }

  return (
    <div className={styles.login_form}>
      <form onSubmit={handleSubmit} method="POST">
        <h6>
          {' '}
          Ingresa con los datos de la cuenta que los administradores de la página te proporcionaron{' '}
        </h6>
        <div className={styles.input_container}>
          <label>Correo </label>
          <input
            type="text"
            name="correo"
            required
            className={styles.correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className={styles.input_container}>
          <label>Contraseña </label>
          <input
            type="password"
            name="contrasena"
            className={styles.contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <div className={styles.button_container}>
          <input type="submit" id="submit" className={styles.submit} />
        </div>
      </form>
    </div>
  )
}

export default Login
