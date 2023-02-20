import { FormEvent, useState } from 'react';

import './styles/global.css';

import { PlusCircle } from 'phosphor-react';

import { Header } from './components/Header';

import { Todo } from './components/Todo/Index';

import styles from './styles/App.module.css';

interface Todo {
  id: number,
  content: string,
  checked: boolean
}

function App() {

  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([{
    id: 1,
    content: 'Almoçar a tempo hoje',
    checked: true,
  }])


  function handleInputChange(event) {
    setTodoText(event?.target.value)
  }


  function handleCreateTodo(event: FormEvent) {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      content: todoText,
      checked: false
    }

    setTodos((prevState)=> [...prevState, newTodo])

    setTodoText('');

    console.log(todos)
  }

  function checkTodo(todoToCheck: Todo) {
    const checkedTodo = todos.filter((todo)=>{
      if(todo.id === todoToCheck.id) {
        console.log(todo.content)
        todo.checked = !todo.checked;
      }

      return todo;
    })
    
    setTodos(checkedTodo);
  }


  function deleteTodo(todoToCheck: Todo) {
    const checkedTodo = todos.filter((todo)=>{
      if(todo.id !== todoToCheck.id) {
        return todo;
      }
    })
    
    setTodos(checkedTodo);
  }
 
  return (
    <div className={styles.container}>
      <Header/>

      <main className={styles.mainContainer}>
          <form onSubmit={handleCreateTodo} className={styles.formContainer}>
            <input 
              type="text"
              value={todoText}
              onChange={handleInputChange}  
              placeholder='Adicione uma nova tarefa' 
            />

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

             <ul className={styles.todoList}>
                {todos.map((todo)=> {
                  return (
                    <Todo key={todo.id} onDeleteTodo={deleteTodo} onCheckTodo={checkTodo}  todo={todo}/>
                  )
                })}
             </ul>
          </div>
      </main>
    </div>
  )
}

export default App
