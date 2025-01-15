import { useState } from 'react'
import './App.css'
import MyRouter from './router/MyRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MyRouter/>
  )
}

export default App
