import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import app from './firebase-conf'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const auth = getAuth(app)

import Login  from './components/Login';
import Inicio from './components/Inicio'
import Clientes from './components/page/Clientes'

function App() {
  const [usuario, setUsuario] = useState(null)

  onAuthStateChanged(auth, (userFirebase) => { // si el usuario esta logeado
    if (userFirebase) { // si el usuario esta logueado
      setUsuario(userFirebase) //guardae el usuario en el estado
      
    } else {
      setUsuario(null)
    }

  });

  

  return (
    <>
      {
          <div>
          <Router>
            <Routes>
              <Route path="/" element={ usuario ? <Inicio correoUsuario={ usuario.email} /> :<Login/>} />
              <Route path="/clientes" element={usuario ? <Clientes correoUsuario={ usuario.email}/>   :<Login/>} />
              
            </Routes>
          </Router>
        </div>
      }
    </>
  )
}

export default App
