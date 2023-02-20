import { useState } from 'react';

import './styles/global.css';

import { PlusCircle } from 'phosphor-react';
import { Header } from './components/Header';
import styles from './styles/App.module.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.container}>
      <Header/>

      <main className={styles.mainContainer}>
          <form className={styles.formContainer}>
            <input type="text" placeholder='Adicione uma nova tarefa' />

            <button type="submit">
              Criar
              <PlusCircle size={20} weight='regular'/>
            </button>
          </form>

          <div className={styles.content}>
             <header>
                <p>
                  Tarefas Criadas
                  <span>0</span>
                </p>

                <p>
                  Concluidas
                  <span>0</span>
                </p>
             </header>
          </div>
      </main>
    </div>
  )
}

export default App
