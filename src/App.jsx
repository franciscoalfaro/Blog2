import { useState } from 'react'


import { Routing } from './router/Routing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routing></Routing>
    </>
  )
}

export default App
