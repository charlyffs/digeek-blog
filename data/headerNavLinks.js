import Cookies from 'universal-cookie'

const cookies = new Cookies()

const headerNavLinks = [
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/projects', title: 'Proyectos' },
  { href: '/about', title: 'Acerca de' },
  ...(cookies.get('nombre') === undefined ? [{ href: '/login', title: 'Ingresar' }] : []),
]

export default headerNavLinks
