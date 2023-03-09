import { useState } from "react"
import './css/Navbar.css'
export function Navbar  ()  {
  
    const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
    console.log(showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
         <h1>brand</h1>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <span> boton</span>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/playlist">Blog</a>
          </li>
          <li>
            <a href="/home">Projects</a>
          </li>
          <li>
            <a href="/cancion/1">About</a>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  )
}
