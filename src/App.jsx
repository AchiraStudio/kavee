import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/global.css'

import Navbar from './components/navbar'
import Landing from './components/landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Landing />
    </>
  )
}

export default App
