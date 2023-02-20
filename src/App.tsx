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
  const [todos, setTodos] = useState<Todo[]>([]);

  const [totalChecked, setTotalChecked] = useState(0);

  function handleInputChange(event: any) {
    event.target.setCustomValidity('')
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
        todo.checked = !todo.checked;

        if(todo.checked) {
          setTotalChecked((prev)=> prev + 1)
        }else {
          setTotalChecked((prev)=> prev - 1)
        }

      }

      return todo;
    })

    setTodos(checkedTodo);
  }


  function deleteTodo(todoToCheck: Todo) {
    const checkedTodos = todos.filter((todo)=>{
      if(todo.id !== todoToCheck.id) {
        if(todoToCheck.checked) {
          setTotalChecked((prev)=> prev - 1);
        }
        return todo;
      }
    })

    const totalcheckedCount = checkedTodos.filter((todo)=>{
        if(todo.checked){
          return todo;
        }
    })

    setTotalChecked(totalcheckedCount.length);
    
    setTodos(checkedTodos);
  }

  function handleInputInvalid(event: any) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

 
  return (
    <div className={styles.container}>
      <Header/>

      <main className={styles.mainContainer}>
          <form onSubmit={handleCreateTodo} className={styles.formContainer}>
            <input 
              type="text"
              required
              onInvalid={handleInputInvalid}
              value={todoText}
              onChange={handleInputChange}  
              placeholder='Adicione uma nova tarefa' 
            />

            <button 
              type="submit" 
              disabled={todoText.length === 0}
            >
              Criar
              <PlusCircle size={20} weight='regular'/>
            </button>
          </form>

          <div className={styles.content}>
             <header>
                <p>
                  Tarefas Criadas
                  <span>{todos.length }</span>
                </p>

                <p>
                  Concluidas
                  <span>{totalChecked}</span>
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
