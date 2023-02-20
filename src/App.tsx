import { useState } from 'react'

import './styles/global.css';

import styles from './styles/App.module.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.container}>
      Desafio 01
    </div>
  )
}

export default App
