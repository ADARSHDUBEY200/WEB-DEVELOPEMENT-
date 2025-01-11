import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <input type="text" placeholder='ENTER THE NAME IN THE INPUT BOX' name='username' id='userId' />
      <p className="read-the-docs">
       ADARSH
      </p>
    </>
  )
}

export default App
